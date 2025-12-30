// item-add.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemMasterService } from '../../services/item-master.service';


@Component({
  selector: 'app-item-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-add.component.html',
  styleUrl: './item-add.component.css'
})
export class ItemAddComponent implements OnInit {
  itemForm: FormGroup;
  isSubmitting = false;
  responseMessage = '';
  responseType: 'success' | 'error' = 'success';
  showResponse = false;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemMasterService
  ) {
    this.itemForm = this.createForm();
  }

  ngOnInit(): void {
    this.setupFormListeners();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      // Basic Information
      Name: ['', [Validators.required]],
      PrintName: [''],
      ParentGroup: ['General', [Validators.required]],
      
      // Unit Information
      MainUnit: ['Pcs.', [Validators.required]],
      AltUnit: ['Pcs.'],
      ConversionFactor: [1],
      ConFactorType: [1],
      
      // Pricing Information
      SalePrice: [0, [Validators.required, Validators.min(0)]],
      PurchasePrice: [0, [Validators.required, Validators.min(0)]],
      MRP: [0, [Validators.min(0)]],
      
      // Packing Information
      PackingUnitName: ['Pcs.'],
      ConFactorPU: [1],
      
      // Stock Settings
      StockValMethod: [5],
      ItemSrNoType: [1],
      
      // Address Information - NESTED FORM GROUP
      Address: this.fb.group({
        OF: [''],
        TmpMasterCode: ['']
      }),
      
      // Accounts
      PurchaseAccount: ['Purchase'],
      SalesAccount: ['Sales'],
      
      // HSN and Temporary Codes
      HSNCode: [''],
      tmpCode: [''],
      tmpMainUnitCode: [''],
      tmpAltUnitCode: [''],
      tmpGroupCode: [''],
      tmpSaleAccCode: [''],
      tmpPurcAccCode: [''],
      tmpPackingUnitCode: [''],
      tmpTaxCategoryCode: [''],
      
      // Tax Information
      TaxCategory: ['GST 18%'],
      HSNCodeGST: [''],
      TaxRateLocal: [9],
      TaxRateLocal1: [9],
      TaxRateCentral: [18],
      PercentOfAmount: [100],
      
      // Batch Settings
      ItemBatchNoType: [1]
    });
  }

  // Getter for nested form controls
  get addressControls() {
    return (this.itemForm.get('Address') as FormGroup).controls;
  }

  // Getter for TmpMasterCode as FormControl
  get tmpMasterCodeControl(): FormControl {
    return this.itemForm.get('Address.TmpMasterCode') as FormControl;
  }

  private setupFormListeners(): void {
    // Auto-fill PrintName from Name
    this.itemForm.get('Name')?.valueChanges.subscribe(name => {
      if (name && !this.itemForm.get('PrintName')?.value) {
        this.itemForm.patchValue({ PrintName: name });
      }
    });

    // Auto-fill HSNCodeGST from HSNCode
    this.itemForm.get('HSNCode')?.valueChanges.subscribe(hsn => {
      if (hsn && !this.itemForm.get('HSNCodeGST')?.value) {
        this.itemForm.patchValue({ HSNCodeGST: hsn });
      }
    });

    // Sync TmpMasterCode with tmpCode
    this.itemForm.get('tmpCode')?.valueChanges.subscribe(code => {
      if (code) {
        this.itemForm.patchValue({
          Address: {
            ...this.itemForm.value.Address,
            TmpMasterCode: code
          }
        });
      }
    });
  }

  // Fill sample data
  fillSampleData(): void {
    const sampleData = this.itemService.getSampleItemData();
    this.itemForm.patchValue(sampleData);
    
    this.responseMessage = 'Sample data loaded successfully';
    this.responseType = 'success';
    this.showResponse = true;
    
    setTimeout(() => {
      this.showResponse = false;
    }, 3000);
  }

  // Reset form
  resetForm(): void {
    if (confirm('Clear all fields?')) {
      this.itemForm.reset();
      this.itemForm.patchValue(this.itemService.getDefaultValues());
      
      this.responseMessage = 'Form cleared';
      this.responseType = 'success';
      this.showResponse = true;
      
      setTimeout(() => {
        this.showResponse = false;
      }, 2000);
    }
  }

  onSubmit(): void {
    // Mark all fields as touched
    this.markFormGroupTouched(this.itemForm);
    
    if (this.itemForm.invalid) {
      this.responseMessage = 'Please fix validation errors';
      this.responseType = 'error';
      this.showResponse = true;
      return;
    }

    this.isSubmitting = true;
    this.showResponse = false;
    
    const formData = this.itemForm.value;
    
    this.itemService.addItemWithAllFields(formData).subscribe({
      next: (response) => {
        const parsedResponse = this.itemService.parseResponse(response);
        
        this.responseType = parsedResponse.success ? 'success' : 'error';
        this.responseMessage = parsedResponse.message || parsedResponse.error;
        this.showResponse = true;
        this.isSubmitting = false;
        
        if (parsedResponse.success) {
          this.resetForm();
        }
      },
      error: (error) => {
        this.responseType = 'error';
        this.responseMessage = 'Failed to add item. Please try again.';
        this.showResponse = true;
        this.isSubmitting = false;
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Helper getters
  get formControls() {
    return this.itemForm.controls;
  }
}