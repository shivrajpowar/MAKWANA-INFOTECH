import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Account {
  Name: string;
  Alias: string;
  PrintName: string;
  ParentGroup: string;
  BillByBillBalancing: boolean;
  Address: {
    Address1: string;
    Address2: string;
    Address3?: string;
    Email?: string;
    Mobile: string;
    WhatsAppNo: string;
    ITPAN: string;
    Contact?: string;
    GSTNo: string;
    CountryName: string;
    StateName: string;
    CityName?: string;
    RegionName?: string;
    AreaName?: string;
    ContDeptName?: string;
    PINCode?: string;
    Station?: string;
    AccNo: string;
    TmpMasterCode?: string;
    C4?: string;
    C5?: string;
  };
  SupplierType?: string;
  PriceLevel?: string;
  PriceLevelForPurc?: string;
  TaxType: string;
  TypeOfDealerGST: string;
  tmpCode?: string;
  tmpParentGrpCode?: string;
  ChequePrintName: string;
  ReverseChargeType?: string;
  InputType?: string;
  GSTReturnFilingPeriod?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountMasterService {
  // Use proxy URLs
  private baseUrl = '/api-proxy';  // This will route through proxy
  private accountApiUrl = '/api/accounts'; // For POST/PUT operations
  
  // Default headers as per your screenshot (without Accept to avoid duplication)
  private defaultHeaders = {
    'SC': '9',
    'UserName': 'm',
    'Pwd': 'm'
  };

  constructor(private http: HttpClient) { }

  // Helper to convert object to XML string
  private convertToXML(data: any, rootElement: string = 'Account'): string {
    const escapeXml = (unsafe: string) => {
      if (!unsafe) return '';
      return unsafe.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };

    const buildXml = (obj: any, nodeName: string): string => {
      let xml = '';
      if (obj === null || obj === undefined) return xml;
      
      if (Array.isArray(obj)) {
        obj.forEach(item => {
          xml += buildXml(item, nodeName);
        });
      } else if (typeof obj === 'object') {
        xml += `<${nodeName}>`;
        for (const [key, value] of Object.entries(obj)) {
          xml += buildXml(value, key);
        }
        xml += `</${nodeName}>`;
      } else {
        xml += `<${nodeName}>${escapeXml(obj.toString())}</${nodeName}>`;
      }
      return xml;
    };

    return `<?xml version="1.0" encoding="UTF-8"?><${rootElement}>${buildXml(data, rootElement)}</${rootElement}>`;
  }

  // Improved XML parser
  private parseXML(xmlString: string): any {
    try {
      // Clean the XML string - remove any HTML tags or doctype
      const cleanXml = xmlString.replace(/<!DOCTYPE[^>[]*(\[[^]]*\])?>/g, '')
                               .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                               .replace(/<html[^>]*>.*?<\/html>/gis, '')
                               .replace(/<head>.*?<\/head>/gis, '')
                               .replace(/<body>.*?<\/body>/gis, '')
                               .trim();
      
      // Find the actual XML content
      const xmlMatch = cleanXml.match(/<\?xml.*?\?>.*$/s);
      const xmlToParse = xmlMatch ? xmlMatch[0] : cleanXml;
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlToParse, 'text/xml');
      
      // Check for parse errors
      const parseError = xmlDoc.getElementsByTagName('parsererror');
      if (parseError.length > 0) {
        console.error('XML Parse Error:', parseError[0].textContent);
        console.error('XML String:', xmlToParse.substring(0, 500));
        return null;
      }
      
      return this.xmlToObject(xmlDoc.documentElement);
    } catch (error) {
      console.error('Error parsing XML:', error);
      console.error('XML String that failed:', xmlString.substring(0, 500));
      return null;
    }
  }

  private xmlToObject(xml: any): any {
    let obj: any = {};
    
    // Handle text content
    if (xml.nodeType === 3) {
      return xml.nodeValue;
    }
    
    // Handle element nodes
    if (xml.nodeType === 1) {
      const nodeName = xml.nodeName;
      
      // If it's the root Account element, process children
      if (xml.hasChildNodes()) {
        const childNodes = xml.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
          const child = childNodes[i];
          const childName = child.nodeName;
          
          // Skip text nodes that only contain whitespace
          if (childName === '#text') {
            const text = child.nodeValue?.trim();
            if (text) {
              obj = text;
            }
            continue;
          }
          
          const childObj = this.xmlToObject(child);
          
          if (typeof obj[childName] === 'undefined') {
            obj[childName] = childObj;
          } else {
            // Convert to array if multiple elements with same name
            if (!Array.isArray(obj[childName])) {
              obj[childName] = [obj[childName]];
            }
            obj[childName].push(childObj);
          }
        }
      }
      
      // Handle leaf nodes (no children or only text)
      if (xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
        return xml.childNodes[0].nodeValue || '';
      }
    }
    
    return obj;
  }

  // Main method to get account by code
  getAccountByCode(masterCode: string): Observable<Account> {
    console.log(`Fetching account ${masterCode} through proxy`);
    
    // Create headers with dynamic MasterCode - FIXED: Accept header only once
    const headers = new HttpHeaders({
      ...this.defaultHeaders,
      'MasterCode': masterCode,
      'Accept': 'application/xml'  // Add Accept here instead of in defaultHeaders
    });

    return this.http.get(this.baseUrl, { 
      headers, 
      responseType: 'text'
    }).pipe(
      map((response: string) => {
        console.log('Raw Response from Proxy:', response.substring(0, 500));
        
        // Check if response is HTML (proxy error)
        if (response.includes('<!doctype html>') || response.includes('<html')) {
          throw new Error('Proxy error: Received HTML instead of XML. Check proxy configuration.');
        }
        
        const parsed = this.parseXML(response);
        console.log('Parsed XML:', parsed);
        
        if (!parsed || !parsed.Account) {
          throw new Error('Invalid XML response or account not found');
        }
        
        return this.mapApiToAccount(parsed.Account);
      }),
      catchError(error => {
        console.error('Error fetching account:', error);
        return throwError(() => new Error(error.message || 'Failed to fetch account'));
      })
    );
  }

  // Test API connection through proxy
  // In account-master.service.ts, update the testApiConnection method:
testApiConnection(masterCode: string): Observable<any> {
  // Use query parameters instead of headers
  const params = new HttpParams()
    .set('SC', '9')
    .set('MasterCode', masterCode)
    .set('UserName', 'm')
    .set('Pwd', 'm');

  console.log('Testing with params:', params.toString());

  return this.http.get(this.baseUrl, { 
    params, 
    responseType: 'text',
    headers: { 'Accept': 'application/xml' }  // Keep Accept as header
  }).pipe(
    map(response => {
      return {
        method: 'Proxy Connection with Query Params',
        status: 'Success',
        responsePreview: response.substring(0, 200) + '...',
        isHtml: response.includes('<!doctype html>') || response.includes('<html'),
        length: response.length,
        rawResponse: response
      };
    }),
    catchError(error => {
      console.error('API Connection Error:', error);
      return throwError(() => new Error('API Connection Failed: ' + error.message));
    })
  );
}

  // Update existing account - FIXED: No duplicate Accept header
  updateAccount(masterCode: string, accountData: Account): Observable<any> {
    const xmlData = this.convertToXML(accountData);
    console.log('Updating Account XML:', xmlData);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/xml',
      'Accept': 'application/xml',
      ...this.defaultHeaders,
      'MasterCode': masterCode
    });

    return this.http.put(`${this.accountApiUrl}/update`, xmlData, {
      headers,
      responseType: 'text'
    }).pipe(
      map(response => {
        console.log('Update Response:', response);
        return this.parseXML(response);
      }),
      catchError(error => {
        console.error('Error updating account:', error);
        return throwError(() => new Error(error.message || 'Failed to update account'));
      })
    );
  }

  // Create new account - FIXED: No duplicate Accept header
  createAccount(accountData: Account): Observable<any> {
    const xmlData = this.convertToXML(accountData);
    console.log('Creating Account XML:', xmlData);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/xml',
      'Accept': 'application/xml',
      ...this.defaultHeaders
    });

    return this.http.post(`${this.accountApiUrl}/create`, xmlData, {
      headers,
      responseType: 'text'
    }).pipe(
      map(response => {
        console.log('Create Response:', response);
        return this.parseXML(response);
      }),
      catchError(error => {
        console.error('Error creating account:', error);
        return throwError(() => new Error(error.message || 'Failed to create account'));
      })
    );
  }

  // Enhanced mapping from API to form data
  mapApiToAccount(apiData: any): Account {
    console.log('Mapping API Data:', apiData);
    
    return {
      Name: apiData.Name || '',
      Alias: apiData.Alias || '',
      PrintName: apiData.PrintName || '',
      ParentGroup: apiData.ParentGroup || '',
      BillByBillBalancing: apiData.BillByBillBalancing === 'True' || apiData.BillByBillBalancing === true,
      Address: {
        Address1: apiData.Address?.Address1 || '',
        Address2: apiData.Address?.Address2 || '',
        Address3: apiData.Address?.Address3 || '',
        Email: apiData.Address?.Email || '',
        Mobile: apiData.Address?.Mobile || '',
        WhatsAppNo: apiData.Address?.WhatsAppNo || '',
        ITPAN: apiData.Address?.ITPAN || '',
        Contact: apiData.Address?.Contact || '',
        GSTNo: apiData.Address?.GSTNo || '',
        CountryName: apiData.Address?.CountryName || '',
        StateName: apiData.Address?.StateName || '',
        CityName: apiData.Address?.CityName || '',
        RegionName: apiData.Address?.RegionName || '',
        AreaName: apiData.Address?.AreaName || '',
        ContDeptName: apiData.Address?.ContDeptName || '',
        PINCode: apiData.Address?.PINCode || '',
        Station: apiData.Address?.Station || '',
        AccNo: apiData.Address?.AccNo || '',
        TmpMasterCode: apiData.Address?.TmpMasterCode || '',
        C4: apiData.Address?.C4 || '',
        C5: apiData.Address?.C5 || ''
      },
      SupplierType: apiData.SupplierType || '',
      PriceLevel: apiData.PriceLevel || '',
      PriceLevelForPurc: apiData.PriceLevelForPurc || '',
      TaxType: apiData.TaxType || '',
      TypeOfDealerGST: apiData.TypeOfDealerGST || '',
      tmpCode: apiData.tmpCode || apiData.Address?.TmpMasterCode || '',
      tmpParentGrpCode: apiData.tmpParentGrpCode || '',
      ChequePrintName: apiData.ChequePrintName || '',
      ReverseChargeType: apiData.ReverseChargeType || '',
      InputType: apiData.InputType || '',
      GSTReturnFilingPeriod: apiData.GSTReturnFilingPeriod || ''
    };
  }

  // Enhanced mapping from API response to form structure
  mapApiToForm(apiData: any): any {
    const account = this.mapApiToAccount(apiData);
    console.log('Mapped Account for Form:', account);
    
    return {
      name: account.Name,
      alias: account.Alias,
      printName: account.PrintName,
      parentGroup: account.ParentGroup,
      billByBillBalancing: account.BillByBillBalancing,
      address: {
        address1: account.Address.Address1,
        address2: account.Address.Address2,
        address3: account.Address.Address3,
        email: account.Address.Email,
        mobile: account.Address.Mobile,
        whatsappNo: account.Address.WhatsAppNo,
        itpan: account.Address.ITPAN,
        contact: account.Address.Contact,
        gstNo: account.Address.GSTNo,
        countryName: account.Address.CountryName,
        stateName: account.Address.StateName,
        cityName: account.Address.CityName,
        regionName: account.Address.RegionName,
        areaName: account.Address.AreaName,
        contDeptName: account.Address.ContDeptName,
        pincode: account.Address.PINCode,
        station: account.Address.Station,
        accNo: account.Address.AccNo,
        bankName: account.Address.C4,
        ifsc: account.Address.C5
      },
      supplierType: account.SupplierType,
      priceLevel: account.PriceLevel,
      priceLevelForPurc: account.PriceLevelForPurc,
      taxType: account.TaxType,
      typeOfDealerGST: account.TypeOfDealerGST,
      tmpCode: account.tmpCode,
      tmpParentGrpCode: account.tmpParentGrpCode,
      chequePrintName: account.ChequePrintName,
      reverseChargeType: account.ReverseChargeType,
      inputType: account.InputType,
      gstReturnFilingPeriod: account.GSTReturnFilingPeriod
    };
  }

  // Enhanced mapping from form to API format
  mapFormToApi(formData: any): Account {
    return {
      Name: formData.name || '',
      Alias: formData.alias || '',
      PrintName: formData.printName || formData.name || '',
      ParentGroup: formData.parentGroup || 'Sundry Debtors',
      BillByBillBalancing: formData.billByBillBalancing || false,
      Address: {
        Address1: formData.address?.address1 || '',
        Address2: formData.address?.address2 || '',
        Address3: formData.address?.address3 || '',
        Email: formData.address?.email || '',
        Mobile: formData.address?.mobile || '',
        WhatsAppNo: formData.address?.whatsappNo || formData.address?.mobile || '',
        ITPAN: formData.address?.itpan || '',
        Contact: formData.address?.contact || '',
        GSTNo: formData.address?.gstNo || '',
        CountryName: formData.address?.countryName || 'India',
        StateName: formData.address?.stateName || '',
        CityName: formData.address?.cityName || '',
        RegionName: formData.address?.regionName || '',
        AreaName: formData.address?.areaName || '',
        ContDeptName: formData.address?.contDeptName || '',
        PINCode: formData.address?.pincode || '',
        Station: formData.address?.station || '',
        AccNo: formData.address?.accNo || '',
        TmpMasterCode: formData.tmpCode || '',
        C4: formData.address?.bankName || '',
        C5: formData.address?.ifsc || ''
      },
      SupplierType: formData.supplierType || '1',
      PriceLevel: formData.priceLevel || '@',
      PriceLevelForPurc: formData.priceLevelForPurc || '@',
      TaxType: formData.taxType || 'Others',
      TypeOfDealerGST: formData.typeOfDealerGST || 'Registered',
      tmpCode: formData.tmpCode || '',
      tmpParentGrpCode: formData.tmpParentGrpCode || '',
      ChequePrintName: formData.chequePrintName || formData.name || '',
      ReverseChargeType: formData.reverseChargeType || '',
      InputType: formData.inputType || '',
      GSTReturnFilingPeriod: formData.gstReturnFilingPeriod || ''
    };
  }

  // Additional helper method for debugging - FIXED: Return type
  testDirectConnection(masterCode: string): Observable<any> {
    const headers = new HttpHeaders({
      ...this.defaultHeaders,
      'MasterCode': masterCode,
      'Accept': 'application/xml'
    });

    // Test with direct URL (for comparison)
    return this.http.get('http://103.174.86.37:982', { 
      headers, 
      responseType: 'text' 
    }).pipe(
      map(response => ({
        method: 'Direct Connection',
        status: 'Success',
        responsePreview: response.substring(0, 200) + '...',
        isHtml: response.includes('<!doctype html>') || response.includes('<html'),
        length: response.length
      })),
      catchError(error => {
        // Return an observable with the error result
        return of({
          method: 'Direct Connection',
          status: 'Failed',
          error: error.message
        });
      })
    );
  }
}