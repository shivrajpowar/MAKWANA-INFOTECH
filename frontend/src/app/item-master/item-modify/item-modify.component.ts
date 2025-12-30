import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemMasterService } from '../../services/item-master.service';

@Component({
  selector: 'app-item-modify',
  templateUrl: './item-modify.component.html',
  styleUrls: ['./item-modify.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class ItemModifyComponent implements OnInit {
  itemForm: FormGroup;
  isLoading = false;
  isDataLoaded = false;
  masterCode: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private itemService: ItemMasterService
  ) {
    this.itemForm = this.createForm();
  }

  ngOnInit(): void {
    this.itemForm.disable();
  }

  createForm(): FormGroup {
    return this.fb.group({
      Name: ['', Validators.required],
      PrintName: ['', Validators.required],
      ParentGroup: ['General'],
      MainUnit: ['Pcs.', Validators.required],
      AltUnit: ['Pcs.'],
      ConversionFactor: [1],
      ConFactorType: [1],
      SalePrice: [0, [Validators.required, Validators.min(0)]],
      PurchasePrice: [0, [Validators.required, Validators.min(0)]],
      MRP: [0, [Validators.min(0)]],
      PackingUnitName: ['Pcs.'],
      ConFactorPU: [1],
      StockValMethod: [5],
      ItemSrNoType: [1],
      PurchaseAccount: ['Purchase'],
      SalesAccount: ['Sales'],
      HSNCode: [''],
      tmpCode: [''],
      tmpMainUnitCode: [''],
      tmpAltUnitCode: [''],
      tmpGroupCode: [''],
      tmpSaleAccCode: [''],
      tmpPurcAccCode: [''],
      tmpPackingUnitCode: [''],
      tmpTaxCategoryCode: [''],
      TaxCategory: ['GST 18%'],
      HSNCodeGST: [''],
      TaxRateLocal: [9],
      TaxRateLocal1: [9],
      TaxRateCentral: [18],
      PercentOfAmount: [100],
      ItemBatchNoType: [1],
      Address: this.fb.group({
        OF: [''],
        TmpMasterCode: ['']
      })
    });
  }

  onLoadData(): void {
    if (!this.masterCode || this.masterCode.trim() === '') {
      this.errorMessage = 'Please enter a Master Code';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.isDataLoaded = false;
    
    this.itemForm.reset();
    this.itemForm.disable();

    this.itemService.getMasterXMLItemMaster(this.masterCode).subscribe({
      next: (xmlResponse) => {
        try {
          const itemData = this.parseXmlResponse(xmlResponse);
          this.itemForm.patchValue(itemData);
          this.itemForm.enable();
          this.isDataLoaded = true;
          this.isLoading = false;
          this.successMessage = 'Data loaded successfully!';
        } catch (error) {
          this.errorMessage = 'Error parsing item data. Please check the Master Code.';
          this.isLoading = false;
        }
      },
      error: (error) => {
        this.errorMessage = 'Failed to load item data. Please check the Master Code.';
        this.isLoading = false;
      }
    });
  }

  parseXmlResponse(xmlString: string): any {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    
    const itemData: any = {};
    
    const fields = [
      'Name', 'PrintName', 'ParentGroup', 'MainUnit', 'AltUnit',
      'ConversionFactor', 'ConFactorType', 'SalePrice', 'PurchasePrice', 
      'MRP', 'PackingUnitName', 'ConFactorPU', 'StockValMethod', 
      'ItemSrNoType', 'PurchaseAccount', 'SalesAccount', 'HSNCode',
      'tmpCode', 'tmpMainUnitCode', 'tmpAltUnitCode', 'tmpGroupCode',
      'tmpSaleAccCode', 'tmpPurcAccCode', 'tmpPackingUnitCode',
      'tmpTaxCategoryCode', 'TaxCategory', 'HSNCodeGST', 'TaxRateLocal',
      'TaxRateLocal1', 'TaxRateCentral', 'PercentOfAmount', 'ItemBatchNoType'
    ];

    fields.forEach(field => {
      const element = xmlDoc.getElementsByTagName(field)[0];
      if (element && element.textContent !== null && element.textContent !== '') {
        if (this.isNumericField(field)) {
          const numValue = parseFloat(element.textContent);
          itemData[field] = isNaN(numValue) ? this.getDefaultValue(field) : numValue;
        } else {
          itemData[field] = element.textContent;
        }
      }
    });

    const address = xmlDoc.getElementsByTagName('Address')[0];
    if (address) {
      itemData.Address = {
        OF: this.getTextValue(address, 'OF', ''),
        TmpMasterCode: this.getTextValue(address, 'TmpMasterCode', '')
      };
    }

    return itemData;
  }

  isNumericField(fieldName: string): boolean {
    const numericFields = ['Price', 'Factor', 'Rate', 'Percent', 'Type', 'Method', 'PU'];
    return numericFields.some(numericField => fieldName.includes(numericField));
  }

  getDefaultValue(fieldName: string): any {
    const defaults: {[key: string]: any} = {
      'ConversionFactor': 1,
      'ConFactorType': 1,
      'SalePrice': 0,
      'PurchasePrice': 0,
      'MRP': 0,
      'ConFactorPU': 1,
      'StockValMethod': 5,
      'ItemSrNoType': 1,
      'TaxRateLocal': 9,
      'TaxRateLocal1': 9,
      'TaxRateCentral': 18,
      'PercentOfAmount': 100,
      'ItemBatchNoType': 1
    };
    return defaults[fieldName] || 0;
  }

  getTextValue(parent: Element, tagName: string, defaultValue: string): string {
    const element = parent.getElementsByTagName(tagName)[0];
    return element && element.textContent ? element.textContent : defaultValue;
  }

  onSubmit(): void {
    if (this.itemForm.invalid) {
      this.markFormGroupTouched(this.itemForm);
      return;
    }

    if (!this.isDataLoaded) {
      this.errorMessage = 'Please load data first using a Master Code';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = this.itemForm.value;
    
    this.itemService.updateItemMaster(this.masterCode, formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        // Show success alert
        alert('Item updated successfully!');
        
        // Reload data to show updated values
        setTimeout(() => {
          this.onLoadData();
        }, 1000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to update item. Please try again.';
      }
    });
  }

  // onReset(): void {
  //   this.masterCode = '';
  //   this.isDataLoaded = false;
  //   this.errorMessage = '';
  //   this.successMessage = '';
  //   this.itemForm.reset();
  //   this.itemForm.disable();
  // }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}