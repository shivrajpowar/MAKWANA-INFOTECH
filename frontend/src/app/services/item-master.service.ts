// item-master.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemMasterService {
  private apiUrl = '/api-proxy/'; // Your proxy URL
  
  constructor(private http: HttpClient) { }
  
  // Get single item by master code (Service Code 9)
  getMasterXMLItemMaster(masterCode: string): Observable<any> {
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

  // Add new item with ALL fields (Service Code 5)
  addItemWithAllFields(itemData: any): Observable<any> {
    const xmlData = this.convertFormDataToCompleteXML(itemData);
    
    console.log('=== ADD ITEM WITH ALL FIELDS ===');
    console.log('Service Code (SC): 5');
    console.log('MasterType: 6');
    console.log('Complete XML Data:', xmlData);
    
    // Create FormData for POST
    const formDataBody = new FormData();
    formDataBody.append('SC', '5');
    formDataBody.append('MasterType', '6');
    formDataBody.append('MasterXml', xmlData);
    formDataBody.append('UserName', 'm');
    formDataBody.append('Pwd', 'm');
    
    return this.http.post(this.apiUrl, formDataBody, {
      responseType: 'text'
    }).pipe(
      tap(response => {
        console.log('=== COMPLETE RESPONSE ===');
        console.log('Response:', response);
        console.log('Response length:', response?.length);
      }),
      catchError(error => {
        console.error('Add item error:', error);
        return throwError(() => error);
      })
    );
  }

  // Helper method to convert ALL form data to XML
  private convertFormDataToCompleteXML(formData: any): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '<Item>';
    
    // Basic Information
    xml += `<Name>${this.escapeXml(formData.Name || '')}</Name>`;
    xml += `<PrintName>${this.escapeXml(formData.PrintName || '')}</PrintName>`;
    xml += `<ParentGroup>${this.escapeXml(formData.ParentGroup || 'General')}</ParentGroup>`;
    
    // Unit Information
    xml += `<MainUnit>${this.escapeXml(formData.MainUnit || 'Pcs.')}</MainUnit>`;
    xml += `<AltUnit>${this.escapeXml(formData.AltUnit || 'Pcs.')}</AltUnit>`;
    xml += `<ConversionFactor>${formData.ConversionFactor || 1}</ConversionFactor>`;
    xml += `<ConFactorType>${formData.ConFactorType || 1}</ConFactorType>`;
    
    // Pricing Information
    xml += `<SalePrice>${formData.SalePrice || 0}</SalePrice>`;
    xml += `<PurchasePrice>${formData.PurchasePrice || 0}</PurchasePrice>`;
    xml += `<MRP>${formData.MRP || 0}</MRP>`;
    
    // Packing Information
    xml += `<PackingUnitName>${this.escapeXml(formData.PackingUnitName || 'Pcs.')}</PackingUnitName>`;
    xml += `<ConFactorPU>${formData.ConFactorPU || 1}</ConFactorPU>`;
    
    // Stock Settings
    xml += `<StockValMethod>${formData.StockValMethod || 5}</StockValMethod>`;
    xml += `<ItemSrNoType>${formData.ItemSrNoType || 1}</ItemSrNoType>`;
    
    // Address Information
    xml += '<Address>';
    xml += `<OF>${this.escapeXml(formData.Address?.OF || '')}</OF>`;
    xml += `<TmpMasterCode>${this.escapeXml(formData.Address?.TmpMasterCode || '')}</TmpMasterCode>`;
    xml += '</Address>';
    
    // Accounts
    xml += `<PurchaseAccount>${this.escapeXml(formData.PurchaseAccount || 'Purchase')}</PurchaseAccount>`;
    xml += `<SalesAccount>${this.escapeXml(formData.SalesAccount || 'Sales')}</SalesAccount>`;
    
    // HSN and Temporary Codes
    xml += `<HSNCode>${this.escapeXml(formData.HSNCode || '')}</HSNCode>`;
    xml += `<tmpCode>${this.escapeXml(formData.tmpCode || '')}</tmpCode>`;
    xml += `<tmpMainUnitCode>${this.escapeXml(formData.tmpMainUnitCode || '')}</tmpMainUnitCode>`;
    xml += `<tmpAltUnitCode>${this.escapeXml(formData.tmpAltUnitCode || '')}</tmpAltUnitCode>`;
    xml += `<tmpGroupCode>${this.escapeXml(formData.tmpGroupCode || '')}</tmpGroupCode>`;
    xml += `<tmpSaleAccCode>${this.escapeXml(formData.tmpSaleAccCode || '')}</tmpSaleAccCode>`;
    xml += `<tmpPurcAccCode>${this.escapeXml(formData.tmpPurcAccCode || '')}</tmpPurcAccCode>`;
    xml += `<tmpPackingUnitCode>${this.escapeXml(formData.tmpPackingUnitCode || '')}</tmpPackingUnitCode>`;
    xml += `<tmpTaxCategoryCode>${this.escapeXml(formData.tmpTaxCategoryCode || '')}</tmpTaxCategoryCode>`;
    
    // Tax Information
    xml += `<TaxCategory>${this.escapeXml(formData.TaxCategory || 'GST 18%')}</TaxCategory>`;
    xml += `<HSNCodeGST>${this.escapeXml(formData.HSNCodeGST || '')}</HSNCodeGST>`;
    xml += `<TaxRateLocal>${formData.TaxRateLocal || 9}</TaxRateLocal>`;
    xml += `<TaxRateLocal1>${formData.TaxRateLocal1 || 9}</TaxRateLocal1>`;
    xml += `<TaxRateCentral>${formData.TaxRateCentral || 18}</TaxRateCentral>`;
    xml += `<PercentOfAmount>${formData.PercentOfAmount || 100}</PercentOfAmount>`;
    
    // Batch Settings
    xml += `<ItemBatchNoType>${formData.ItemBatchNoType || 1}</ItemBatchNoType>`;
    
    xml += '</Item>';
    
    return xml;
  }

  // Update/Modify existing item (Service Code 6)
  updateItemMaster(masterCode: string, formData: any): Observable<any> {
    const xmlData = this.convertFormDataToCompleteXML(formData);
    
    console.log('=== UPDATE REQUEST DEBUG ===');
    console.log('Service Code (SC): 6');
    console.log('Master Code:', masterCode);
    console.log('XML Data to send:', xmlData);
    
    const headers = new HttpHeaders({
      'SC': '6',
      'MasterCode': masterCode,
      'MasterXml': xmlData,
      'UserName': 'm',
      'Pwd': 'm'
    });

    return this.http.get(this.apiUrl, { 
      headers, 
      responseType: 'text' 
    }).pipe(
      tap(response => {
        console.log('=== RAW UPDATE RESPONSE ===');
        console.log('Response received:', response);
        console.log('Response length:', response?.length);
        console.log('Is empty?', !response || response.trim() === '');
      }),
      catchError(error => {
        console.error('Update error:', error);
        return throwError(() => error);
      })
    );
  }

  // Escape XML special characters
  private escapeXml(unsafe: string): string {
    if (!unsafe) return '';
    
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      
  }

  // Simple response parser
  parseResponse(xmlString: string): any {
    if (!xmlString || xmlString.trim() === '') {
      return {
        success: false,
        error: 'Empty response from server',
        rawResponse: xmlString
      };
    }
    
    try {
      if (xmlString.toLowerCase().includes('welcome') || 
          xmlString.toLowerCase().includes('success') ||
          xmlString.toLowerCase().includes('saved')) {
        return {
          success: true,
          message: xmlString,
          rawResponse: xmlString
        };
      }
      
      if (xmlString.toLowerCase().includes('error')) {
        return {
          success: false,
          error: xmlString,
          rawResponse: xmlString
        };
      }
      
      return {
        success: true,
        message: 'Operation completed successfully',
        rawResponse: xmlString
      };
      
    } catch (error) {
      return {
        success: false,
        error: 'Failed to parse response',
        rawResponse: xmlString
      };
    }
  }

  // --- NEW METHODS FOR SAMPLE DATA ---
  
  // Get sample item data based on type
  getSampleItemData(): any {
    return {
      Name: 'BUSY SS 21 New11',
      PrintName: 'BUSY SS 21 New',
      ParentGroup: 'General',
      MainUnit: 'Pcs.',
      AltUnit: 'Pcs.',
      ConversionFactor: 1,
      ConFactorType: 1,
      SalePrice: 17700,
      PurchasePrice: 13500,
      MRP: 20000,
      PackingUnitName: 'Pcs.',
      ConFactorPU: 1,
      StockValMethod: 5,
      ItemSrNoType: 1,
      Address: {
        OF: '',
        TmpMasterCode: '1298'
      },
      PurchaseAccount: 'Purchase',
      SalesAccount: 'Sales',
      HSNCode: '1234',
      tmpCode: '1298',
      tmpMainUnitCode: '1183',
      tmpAltUnitCode: '1183',
      tmpGroupCode: '401',
      tmpSaleAccCode: '4',
      tmpPurcAccCode: '5',
      tmpPackingUnitCode: '1183',
      tmpTaxCategoryCode: '1101',
      TaxCategory: 'GST 18%',
      HSNCodeGST: '1234',
      TaxRateLocal: 9,
      TaxRateLocal1: 9,
      TaxRateCentral: 18,
      PercentOfAmount: 100,
      ItemBatchNoType: 1
    };
  }

  // Get default values
  getDefaultValues(): any {
    return {
      Name: '',
      PrintName: '',
      ParentGroup: 'General',
      MainUnit: 'Pcs.',
      AltUnit: 'Pcs.',
      ConversionFactor: 1,
      ConFactorType: 1,
      SalePrice: 0,
      PurchasePrice: 0,
      MRP: 0,
      PackingUnitName: 'Pcs.',
      ConFactorPU: 1,
      StockValMethod: 5,
      ItemSrNoType: 1,
      Address: {
        OF: '',
        TmpMasterCode: ''
      },
      PurchaseAccount: 'Purchase',
      SalesAccount: 'Sales',
      HSNCode: '',
      tmpCode: '',
      tmpMainUnitCode: '',
      tmpAltUnitCode: '',
      tmpGroupCode: '',
      tmpSaleAccCode: '',
      tmpPurcAccCode: '',
      tmpPackingUnitCode: '',
      tmpTaxCategoryCode: '',
      TaxCategory: 'GST 18%',
      HSNCodeGST: '',
      TaxRateLocal: 9,
      TaxRateLocal1: 9,
      TaxRateCentral: 18,
      PercentOfAmount: 100,
      ItemBatchNoType: 1
    };
  }
}