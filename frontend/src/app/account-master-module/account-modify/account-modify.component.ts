import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { AccountMasterService } from '../../services/account-master.service';

@Component({
  selector: 'app-account-modify',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './account-modify.component.html',
  styleUrls: ['./account-modify.component.css']
})
export class AccountModifyComponent implements OnInit {
  accountForm!: FormGroup;
  isSubmitting = false;
  isLoading = false;
  isTestingApi = false;
  successMessage = '';
  errorMessage = '';
  infoMessage = '';
  masterCode = '';
  isEditing = false;
  rawXmlData = '';
  apiTestResult: any = null;
  
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

  supplierTypes = [
    { value: '1', label: 'Supplier Type 1' },
    { value: '2', label: 'Supplier Type 2' },
    { value: '3', label: 'Supplier Type 3' }
  ];

  reverseChargeTypes = [
    'Not Applicable',
    'Regular',
    'Reverse'
  ];

  inputTypes = [
    'Section 17(5)-ITC None',
    'Section 17(5)-ITC Allowed',
    'Others'
  ];

  gstReturnPeriods = [
    '1',
    '2',
    '3',
    '4',
    '5'
  ];

  constructor(
    private fb: FormBuilder,
    private accountService: AccountMasterService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    // Check if masterCode is provided in query params
    this.route.queryParams.subscribe(params => {
      if (params['masterCode']) {
        this.masterCode = params['masterCode'];
        this.fetchAccountDetails(this.masterCode);
      }
    });
  }

  private initForm(): void {
    this.accountForm = this.fb.group({
      /* Account Details */
      name: ['', [Validators.required, Validators.maxLength(100)]],
      alias: ['', Validators.maxLength(50)],
      printName: ['', Validators.maxLength(100)],
      parentGroup: ['Sundry Debtors', Validators.required],
      billByBillBalancing: [false],

      /* Address Details */
      address: this.fb.group({
        address1: ['', Validators.maxLength(100)],
        address2: ['', Validators.maxLength(100)],
        address3: ['', Validators.maxLength(100)],
        email: ['', Validators.email],
        mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        whatsappNo: ['', Validators.pattern(/^[0-9]{10,12}$/)],
        itpan: ['', [Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]],
        contact: ['', Validators.maxLength(50)],
        gstNo: ['', [Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)]],
        countryName: ['India'],
        stateName: ['', Validators.maxLength(50)],
        cityName: ['', Validators.maxLength(50)],
        regionName: ['', Validators.maxLength(50)],
        areaName: ['', Validators.maxLength(50)],
        contDeptName: ['', Validators.maxLength(50)],
        pincode: ['', Validators.pattern(/^[0-9]{6}$/)],
        station: ['', Validators.maxLength(50)],
        accNo: ['', Validators.maxLength(20)],
        bankName: ['', Validators.maxLength(50)],
        ifsc: ['', Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]
      }),

      /* Tax & Other Info */
      taxType: ['Others'],
      typeOfDealerGST: ['Registered'],
      chequePrintName: ['', Validators.maxLength(100)],
      supplierType: ['1'],
      priceLevel: ['@'],
      priceLevelForPurc: ['@'],
      reverseChargeType: ['Not Applicable'],
      inputType: ['Section 17(5)-ITC None'],
      gstReturnFilingPeriod: ['1'],
      
      /* Hidden fields */
      tmpCode: [''],
      tmpParentGrpCode: ['']
    });

    // Disable form initially until account is loaded
    this.accountForm.disable();
  }

  fetchAccountDetails(masterCode: string): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.infoMessage = '';
    this.apiTestResult = null;
    
    console.log('Fetching account details for:', masterCode);
    this.infoMessage = `Fetching account with MasterCode: ${masterCode}...`;
    
    // First test API connection
    this.testApiConnection(masterCode);
    
    // Then get parsed account data
    this.accountService.getAccountByCode(masterCode).subscribe({
      next: (account) => {
        this.isLoading = false;
        this.isEditing = true;
        
        console.log('Fetched Account:', account);
        
        // Map API response to form structure
        const formData = this.accountService.mapApiToForm(account);
        console.log('Form Data to Patch:', formData);
        
        // Update form with fetched data
        this.accountForm.patchValue(formData);
        this.accountForm.enable();
        
        this.successMessage = `Account "${account.Name}" loaded successfully!`;
        this.infoMessage = `Master Code: ${account.tmpCode || masterCode}`;
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Failed to fetch account details.';
        console.error('Error fetching account:', error);
        
        // Show API test result if available
        if (this.apiTestResult) {
          this.infoMessage = `API Test: Status ${this.apiTestResult.status} - ${this.apiTestResult.statusText}`;
        }
      }
    });
  }

  testApiConnection(masterCode: string): void {
    this.isTestingApi = true;
    this.accountService.testApiConnection(masterCode).subscribe({
      next: (result) => {
        this.isTestingApi = false;
        this.apiTestResult = result;
        console.log('API Test Result:', result);
      },
      error: (error) => {
        this.isTestingApi = false;
        console.error('API Test Error:', error);
      }
    });
  }

  onSearch(): void {
    const inputElement = document.getElementById('searchMasterCode') as HTMLInputElement;
    const masterCode = inputElement?.value;
    
    if (!masterCode || !masterCode.trim()) {
      this.errorMessage = 'Please enter a Master Code to search.';
      return;
    }
    
    if (!/^\d+$/.test(masterCode.trim())) {
      this.errorMessage = 'Master Code should contain only numbers.';
      return;
    }
    
    this.masterCode = masterCode.trim();
    this.fetchAccountDetails(this.masterCode);
  }

  onSearchWithHeadersInfo(): void {
    const inputElement = document.getElementById('searchMasterCode') as HTMLInputElement;
    const masterCode = inputElement?.value;
    
    if (!masterCode || !masterCode.trim()) {
      this.errorMessage = 'Please enter a Master Code to search.';
      return;
    }
    
    this.masterCode = masterCode.trim();
    
    // Show header information
    this.infoMessage = `Request Headers: SC=9, MasterCode=${this.masterCode}, UserName=m, Pwd=m`;
    
    // Fetch after showing info
    setTimeout(() => {
      this.fetchAccountDetails(this.masterCode);
    }, 1000);
  }

  onSubmit(): void {
    if (this.accountForm.invalid) {
      this.markFormGroupTouched(this.accountForm);
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    if (!this.masterCode) {
      this.errorMessage = 'Master Code is required for updating account.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.infoMessage = `Updating account with MasterCode: ${this.masterCode}...`;

    const formData = this.accountForm.value;
    console.log('Form Data for Update:', formData);
    
    const apiData = this.accountService.mapFormToApi(formData);
    console.log('API Data for Update:', apiData);

    this.accountService.updateAccount(this.masterCode, apiData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        console.log('Account updated successfully:', response);
        this.successMessage = 'Account updated successfully!';
        this.infoMessage = '';
        
        // Refresh the data
        setTimeout(() => {
          this.fetchAccountDetails(this.masterCode);
        }, 2000);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error updating account:', error);
        this.errorMessage = error.message || 'Failed to update account. Please try again.';
        this.infoMessage = '';
      }
    });
  }

  onReset(): void {
    if (this.isEditing && confirm('Are you sure you want to reset the form? All changes will be lost.')) {
      this.fetchAccountDetails(this.masterCode);
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

  isFieldInvalid(fieldName: string): boolean {
    const field = this.accountForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  isFieldInvalidInGroup(groupName: string, fieldName: string): boolean {
    const group = this.accountForm.get(groupName) as FormGroup;
    const field = group?.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  navigateToAdd(): void {
    this.router.navigate(['/accounts/add']);
  }

  clearForm(): void {
    this.accountForm.reset({
      parentGroup: 'Sundry Debtors',
      billByBillBalancing: false,
      address: {
        countryName: 'India'
      },
      taxType: 'Others',
      typeOfDealerGST: 'Registered',
      supplierType: '1',
      priceLevel: '@',
      priceLevelForPurc: '@',
      reverseChargeType: 'Not Applicable',
      inputType: 'Section 17(5)-ITC None',
      gstReturnFilingPeriod: '1'
    });
    this.masterCode = '';
    this.isEditing = false;
    this.accountForm.disable();
    this.errorMessage = '';
    this.successMessage = '';
    this.infoMessage = '';
    this.apiTestResult = null;
    
    // Clear search input
    const searchInput = document.getElementById('searchMasterCode') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
  }

  getDefaultHeadersInfo(): string {
    return `Default Headers: SC=9, UserName=m, Pwd=m\nDynamic Header: MasterCode=${this.masterCode || '[Enter Code]'}`;
  }

  showHeadersInfo(): void {
    alert(this.getDefaultHeadersInfo());
  }
}