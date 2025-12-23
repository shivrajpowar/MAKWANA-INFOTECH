import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountMasterService {
  private apiUrl = '/api-proxy/'; // Your proxy URL
  
  constructor(private http: HttpClient) { }
  
  // Get single account by master code (Service Code 9)
  getMasterXML(masterCode: string): Observable<any> {
    const headers = new HttpHeaders({
      'SC': '9',
      'MasterCode': masterCode,
      'UserName': 'm',
      'Pwd': 'm'
    });

    return this.http.get(this.apiUrl, { 
      headers, 
      responseType: 'text' 
    });
  }

  // Create new account (Service Code 5 - Add Master from XML)
  createMasterXML(accountData: any): Observable<any> {
    // Convert the account data to XML format
    const xmlData = this.convertAccountToXML(accountData);
    
    const headers = new HttpHeaders({
      'SC': '5', // Service code 5 for Add Master
      'MasterType': '2', // 2 denotes Account master
      'MasterXml': xmlData, // XML data in header
      'UserName': 'm',
      'Pwd': 'm'
    });

    // GET request with headers as per Busy API
    return this.http.get(this.apiUrl, { 
      headers, 
      responseType: 'text' 
    }).pipe(
      catchError(error => {
        console.error('Create error:', error);
        return throwError(() => error);
      })
    );
  }

  // Update/Modify existing account (Service Code 6)
  updateMasterXML(masterCode: string, accountData: any): Observable<any> {
    const xmlData = this.convertAccountToXML(accountData);
    
    const headers = new HttpHeaders({
      'SC': '6', // Service code 6 for Modify Master
      'MasterCode': masterCode, // Existing master code
      'MasterXml': xmlData, // XML data in header
      'UserName': 'm',
      'Pwd': 'm'
    });

    return this.http.get(this.apiUrl, { 
      headers, 
      responseType: 'text' 
    }).pipe(
      catchError(error => {
        console.error('Update error:', error);
        return throwError(() => error);
      })
    );
  }

  // Helper method to convert account object to XML
  private convertAccountToXML(accountData: any): string {
    let xml = '<Account>';
    
    // Add basic fields
    const basicFields = [
      'Name', 'Alias', 'PrintName', 'ParentGroup', 'BillByBillBalancing',
      'SupplierType', 'PriceLevel', 'PriceLevelForPurc', 'TaxType',
      'TypeOfDealerGST', 'tmpCode', 'tmpParentGrpCode', 'ChequePrintName',
      'ReverseChargeType', 'InputType', 'GSTReturnFilingPeriod'
    ];
    
    basicFields.forEach(field => {
      if (accountData[field] !== undefined && accountData[field] !== null) {
        const value = accountData[field];
        xml += `<${field}>${this.escapeXml(value.toString())}</${field}>`;
      } else if (field === 'BillByBillBalancing') {
        // Default value for BillByBillBalancing
        xml += `<BillByBillBalancing>True</BillByBillBalancing>`;
      }
    });
    
    // Add Address section
    if (accountData.Address) {
      xml += '<Address>';
      
      const addressFields = [
        'Address1', 'Address2', 'Address3', 'Email', 'Mobile', 'WhatsAppNo',
        'ITPAN', 'Contact', 'GSTNo', 'OF', 'CountryName', 'StateName',
        'CityName', 'RegionName', 'AreaName', 'ContDeptName', 'PINCode',
        'Station', 'AccNo', 'TmpMasterCode', 'C4', 'C5'
      ];
      
      addressFields.forEach(field => {
        if (accountData.Address[field] !== undefined && accountData.Address[field] !== null) {
          const value = accountData.Address[field];
          xml += `<${field}>${this.escapeXml(value.toString())}</${field}>`;
        } else if (field === 'OF') {
          xml += `<${field}></${field}>`;
        } else if (field === 'TmpMasterCode' && accountData.tmpCode) {
          // Use tmpCode from main object if TmpMasterCode is not provided
          xml += `<TmpMasterCode>${accountData.tmpCode}</TmpMasterCode>`;
        }
      });
      
      xml += '</Address>';
    }
    
    xml += '</Account>';
    
    return xml;
  }

  // Helper method to escape XML special characters
  private escapeXml(unsafe: string): string {
    if (!unsafe) return '';
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  }

  // Parse XML response for Create/Update operations
  parseCreateUpdateResponse(xmlString: string): any {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      
      // Check for errors in XML
      const parserError = xmlDoc.getElementsByTagName('parsererror');
      if (parserError.length > 0) {
       console.error(`"<"XML Parse Error: ${parserError[0].textContent}`);
        return { success: false, error: 'Invalid XML response' };
      }
      
      // Check for Busy API error response
      const errorElement = xmlDoc.getElementsByTagName('Error')[0];
      if (errorElement) {
        const errorCodeElement = xmlDoc.getElementsByTagName('ErrorCode')[0];
        const errorDescElement = xmlDoc.getElementsByTagName('ErrorDescription')[0];
        
        return { 
          success: false, 
          error: errorElement.textContent || 'Unknown error',
          errorCode: errorCodeElement?.textContent || '',
          errorDescription: errorDescElement?.textContent || ''
        };
      }
      
      // Check for success response
      const successElement = xmlDoc.getElementsByTagName('Success')[0];
      if (successElement) {
        const masterCodeElement = xmlDoc.getElementsByTagName('MasterCode')[0];
        const masterNameElement = xmlDoc.getElementsByTagName('MasterName')[0];
        const messageElement = xmlDoc.getElementsByTagName('Message')[0];
        
        return {
          success: true,
          message: successElement.textContent || messageElement?.textContent || 'Operation successful',
          masterCode: masterCodeElement?.textContent || '',
          masterName: masterNameElement?.textContent || ''
        };
      }
      
      // Some APIs might return MasterCode directly
      const masterCodeElement = xmlDoc.getElementsByTagName('MasterCode')[0];
      if (masterCodeElement) {
        return {
          success: true,
          message: 'Account created successfully',
          masterCode: masterCodeElement.textContent || '',
          masterName: xmlDoc.getElementsByTagName('MasterName')[0]?.textContent || ''
        };
      }
      
      // Try to find any indication of success
      const responseText = xmlString.toLowerCase();
      if (responseText.includes('success') || responseText.includes('created')) {
        return {
          success: true,
          message: 'Operation appears successful',
          rawResponse: xmlString
        };
      }
      
      return { 
        success: false, 
        error: 'Unknown response format',
        rawResponse: xmlString 
      };
      
    } catch (error) {
      console.error('Error parsing XML:', error);
      return { 
        success: false, 
        error: 'Failed to parse response',
        rawResponse: xmlString 
      };
    }
  }

  // Parse XML for Get operations (different structure)
  parseGetResponse(xmlString: string): any {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      
      const accountElement = xmlDoc.getElementsByTagName('Account')[0];
      if (!accountElement) return {};
      
      const result: any = {};
      
      // Parse simple elements
      const simpleElements = [
        'Name', 'Alias', 'PrintName', 'ParentGroup', 'BillByBillBalancing',
        'SupplierType', 'PriceLevel', 'PriceLevelForPurc', 'TaxType', 
        'TypeOfDealerGST', 'tmpCode', 'tmpParentGrpCode', 'ChequePrintName',
        'ReverseChargeType', 'InputType', 'GSTReturnFilingPeriod'
      ];
      
      simpleElements.forEach(elementName => {
        const element = accountElement.getElementsByTagName(elementName)[0];
        if (element) {
          result[elementName] = element.textContent || '';
        }
      });
      
      // Parse Address
      const addressElement = accountElement.getElementsByTagName('Address')[0];
      if (addressElement) {
        result.Address = {};
        const addressElements = [
          'Address1', 'Address2', 'Address3', 'Email', 'Mobile', 'WhatsAppNo',
          'ITPAN', 'Contact', 'GSTNo', 'OF', 'CountryName', 'StateName',
          'CityName', 'RegionName', 'AreaName', 'ContDeptName', 'PINCode',
          'Station', 'AccNo', 'TmpMasterCode', 'C4', 'C5'
        ];
        
        addressElements.forEach(elementName => {
          const element = addressElement.getElementsByTagName(elementName)[0];
          if (element) {
            result.Address[elementName] = element.textContent || '';
          }
        });
      }
      
      return result;
      
    } catch (error) {
      console.error('Error parsing XML:', error);
      return {};
    }
  }
}