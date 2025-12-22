import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { AccountMasterService } from '../../services/account-master.service';

@Component({
  selector: 'app-account-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.css']
})
export class AccountAddComponent implements OnInit {
  accountForm!: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  
  // Sample parent groups (you can fetch these from API if needed)
  parentGroups = [
    'Sundry Debtors',
    'Sundry Creditors',
    'Bank Accounts',
    'Cash-in-hand',
    'Direct Expenses',
    'Indirect Expenses',
    'Direct Income',
    'Indirect Income'
  ];

  constructor(
    private fb: FormBuilder,
    private accountService:AccountMasterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.accountForm = this.fb.group({
      /* Account Details */
      name: ['', [Validators.required, Validators.maxLength(100)]],
      alias: ['', Validators.maxLength(50)],
      printName: ['', Validators.maxLength(100)],
      parentGroup: ['Sundry Debtors', Validators.required],
      billByBillBalancing: [false],

      /* Address Details (Nested FormGroup) */
      address: this.fb.group({
        address1: ['', Validators.maxLength(100)],
        address2: ['', Validators.maxLength(100)],
        mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        whatsappNo: ['', Validators.pattern(/^[0-9]{10}$/)],
        itpan: ['', [Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]],
        gstNo: ['', [Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)]],
        countryName: ['India'],
        stateName: ['', Validators.maxLength(50)],
        areaName: ['', Validators.maxLength(50)],
        accNo: ['', Validators.maxLength(20)],
        bankName: ['', Validators.maxLength(50)],
        ifsc: ['', Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]
      }),

      /* Tax & Other Info */
      taxType: ['Others'],
      typeOfDealerGST: ['Registered'],
      chequePrintName: ['', Validators.maxLength(100)],
      
      /* Optional Fields */
      supplierType: [''],
      priceLevel: [''],
      priceLevelForPurc: [''],
      reverseChargeType: [''],
      inputType: [''],
      gstReturnFilingPeriod: ['']
    });

    // Auto-fill printName and chequePrintName when name changes
    this.accountForm.get('name')?.valueChanges.subscribe(name => {
      const printNameCtrl = this.accountForm.get('printName');
      const chequePrintNameCtrl = this.accountForm.get('chequePrintName');
      
      if (printNameCtrl?.value === '') {
        printNameCtrl.setValue(name);
      }
      if (chequePrintNameCtrl?.value === '') {
        chequePrintNameCtrl.setValue(name);
      }
    });

    // Auto-fill whatsappNo when mobile changes
    this.accountForm.get('address.mobile')?.valueChanges.subscribe(mobile => {
      const whatsappCtrl = this.accountForm.get('address.whatsappNo');
      if (whatsappCtrl?.value === '') {
        whatsappCtrl.setValue(mobile);
      }
    });
  }

  onSubmit(): void {
    if (this.accountForm.invalid) {
      this.markFormGroupTouched(this.accountForm);
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = this.accountForm.value;
    const apiData = this.accountService.mapFormToApi(formData);

    this.accountService.createAccount(apiData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        console.log('Account created successfully:', response);
        this.successMessage = 'Account created successfully!';
        
        // Reset form
        this.accountForm.reset({
          parentGroup: 'Sundry Debtors',
          billByBillBalancing: false,
          address: {
            countryName: 'India'
          },
          taxType: 'Others',
          typeOfDealerGST: 'Registered'
        });
        
        // Clear messages after 5 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error creating account:', error);
        this.errorMessage = error.message || 'Failed to create account. Please try again.';
      }
    });
  }

  onReset(): void {
    if (confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
      this.accountForm.reset({
        parentGroup: 'Sundry Debtors',
        billByBillBalancing: false,
        address: {
          countryName: 'India'
        },
        taxType: 'Others',
        typeOfDealerGST: 'Registered'
      });
      this.errorMessage = '';
      this.successMessage = '';
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Helper methods for template validation
  isFieldInvalid(fieldName: string): boolean {
    const field = this.accountForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  isFieldInvalidInGroup(groupName: string, fieldName: string): boolean {
    const group = this.accountForm.get(groupName) as FormGroup;
    const field = group?.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  navigateToModify(): void {
    this.router.navigate(['/accounts/modify']);
  }
}