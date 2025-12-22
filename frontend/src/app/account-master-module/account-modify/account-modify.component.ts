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
  masterCode: string = '';
  isLoading: boolean = false;
  isUpdating: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  originalData: any = null;
  
  // New form for master code input
  masterCodeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountMasterService
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    // Check route parameters
    this.route.params.subscribe(params => {
      if (params['masterCode']) {
        this.masterCode = params['masterCode'];
        this.masterCodeForm.patchValue({ masterCode: this.masterCode });
        this.loadAccountData();
      }
    });

    // Check query parameters
    this.route.queryParams.subscribe(params => {
      if (params['masterCode']) {
        this.masterCode = params['masterCode'];
        this.masterCodeForm.patchValue({ masterCode: this.masterCode });
        this.loadAccountData();
      }
    });
  }

  private initializeForms(): void {
    // Master Code Form
    this.masterCodeForm = this.fb.group({
      masterCode: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });

    // Account Form
    this.accountForm = this.fb.group({
      // Basic Information
      Name: ['', Validators.required],
      Alias: [''],
      PrintName: [''],
      ParentGroup: [''],
      BillByBillBalancing: [''],
      
      // Address Information
      Address: this.fb.group({
        Address1: [''],
        Address2: [''],
        Address3: [''],
        Email: ['', [Validators.email]],
        Mobile: ['', [Validators.pattern('^[0-9]{10}$')]],
        WhatsAppNo: [''],
        ITPAN: [''],
        Contact: [''],
        GSTNo: [''],
        OF: [''],
        CountryName: [''],
        StateName: [''],
        CityName: [''],
        RegionName: [''],
        AreaName: [''],
        ContDeptName: [''],
        PINCode: [''],
        Station: [''],
        AccNo: [''],
        TmpMasterCode: [''],
        C4: [''],
        C5: ['']
      }),
      
      // Additional Information
      SupplierType: [''],
      PriceLevel: [''],
      PriceLevelForPurc: [''],
      TaxType: [''],
      TypeOfDealerGST: [''],
      tmpCode: [''],
      tmpParentGrpCode: [''],
      ChequePrintName: [''],
      ReverseChargeType: [''],
      InputType: [''],
      GSTReturnFilingPeriod: ['']
    });
  }

  onMasterCodeSubmit(): void {
    if (this.masterCodeForm.invalid) {
      this.masterCodeForm.get('masterCode')?.markAsTouched();
      return;
    }

    const newMasterCode = this.masterCodeForm.get('masterCode')?.value;
    if (newMasterCode && newMasterCode !== this.masterCode) {
      this.masterCode = newMasterCode;
      
      // Update URL without reloading page
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { masterCode: this.masterCode },
        queryParamsHandling: 'merge'
      });
      
      this.loadAccountData();
    }
  }

  loadAccountData(): void {
    if (!this.masterCode) {
      this.errorMessage = 'Master Code is required';
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.originalData = null;
    
    // Reset form
    this.accountForm.reset();
    this.initializeForms();
    this.masterCodeForm.patchValue({ masterCode: this.masterCode });

    this.accountService.getMasterXML(this.masterCode).subscribe({
      next: (xmlResponse) => {
        try {
          const accountData = this.parseXMLResponse(xmlResponse);
          if (accountData && Object.keys(accountData).length > 0) {
            this.originalData = JSON.parse(JSON.stringify(accountData));
            this.populateForm(accountData);
          } else {
            this.errorMessage = 'No account found for this master code';
            this.accountForm.disable();
          }
          this.isLoading = false;
        } catch (error) {
          this.errorMessage = 'Error parsing response data';
          this.isLoading = false;
          console.error('Parse error:', error);
        }
      },
      error: (error) => {
        this.errorMessage = 'Failed to load account data. Please check the master code.';
        this.isLoading = false;
        this.accountForm.disable();
        console.error('Load error:', error);
      }
    });
  }

  private parseXMLResponse(xmlString: string): any {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      const accountElement = xmlDoc.getElementsByTagName('Account')[0];
      
      if (!accountElement) return null;
      
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
      console.error('XML parsing error:', error);
      return null;
    }
  }

  private populateForm(data: any): void {
    if (!data) return;

    // Enable form
    this.accountForm.enable();

    // Set basic fields
    this.accountForm.patchValue({
      Name: data.Name || '',
      Alias: data.Alias || '',
      PrintName: data.PrintName || '',
      ParentGroup: data.ParentGroup || '',
      BillByBillBalancing: data.BillByBillBalancing || '',
      SupplierType: data.SupplierType || '',
      PriceLevel: data.PriceLevel || '',
      PriceLevelForPurc: data.PriceLevelForPurc || '',
      TaxType: data.TaxType || '',
      TypeOfDealerGST: data.TypeOfDealerGST || '',
      tmpCode: data.tmpCode || '',
      tmpParentGrpCode: data.tmpParentGrpCode || '',
      ChequePrintName: data.ChequePrintName || '',
      ReverseChargeType: data.ReverseChargeType || '',
      InputType: data.InputType || '',
      GSTReturnFilingPeriod: data.GSTReturnFilingPeriod || ''
    });

    // Set address fields
    if (data.Address) {
      (this.accountForm.get('Address') as FormGroup).patchValue(data.Address);
    }
  }
onSubmit(): void {
  if (this.accountForm.invalid) {
    this.markFormGroupTouched(this.accountForm);
    return;
  }

  this.isUpdating = true;
  this.successMessage = '';
  this.errorMessage = '';

  const formData = this.accountForm.value;
  
  // Ensure the master code is included
  formData.tmpCode = this.masterCode;
  if (formData.Address) {
    formData.Address.TmpMasterCode = this.masterCode;
  }

  // Call the update method from service
  this.accountService.updateMasterXML(this.masterCode, formData).subscribe({
    next: (response) => {
      try {
        // Parse the response to check if it was successful
        console.log('Update response:', response);
        
        // Use the component's own parseXMLResponse method
        if (response && response.includes('<Account>')) {
          this.successMessage = 'Account updated successfully!';
          
          // Use component's parseXMLResponse method (not service method)
          const updatedData = this.parseXMLResponse(response);
          if (updatedData) {
            this.originalData = updatedData;
          } else {
            this.originalData = JSON.parse(JSON.stringify(formData));
          }
        } else {
          // Even if response doesn't contain XML, consider it successful if no error
          this.successMessage = 'Account updated successfully!';
          this.originalData = JSON.parse(JSON.stringify(formData));
        }
      } catch (error) {
        this.successMessage = 'Account updated successfully!';
        this.originalData = JSON.parse(JSON.stringify(formData));
      }
      
      this.isUpdating = false;
      
      // Reload updated data after 1 second
      setTimeout(() => {
        this.loadAccountData();
      }, 1000);
    },
    error: (error) => {
      this.errorMessage = 'Failed to update account. Please try again.';
      this.isUpdating = false;
      console.error('Update error:', error);
      
      // Show more specific error message if available
      if (error.status === 400) {
        this.errorMessage = 'Invalid data format. Please check your inputs.';
      } else if (error.status === 404) {
        this.errorMessage = 'Account not found. The master code may be invalid.';
      } else if (error.status === 500) {
        this.errorMessage = 'Server error. Please try again later.';
      }
    }
  });
}

  onReset(): void {
    if (this.originalData) {
      this.populateForm(this.originalData);
      this.successMessage = '';
      this.errorMessage = '';
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

  // Helper methods
  isMasterCodeInvalid(): boolean {
    const control = this.masterCodeForm.get('masterCode');
    return control ? control.invalid && control.touched : false;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.accountForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  // Getters for template
  get masterCodeControl() { return this.masterCodeForm.get('masterCode'); }
  get name() { return this.accountForm.get('Name'); }
  get email() { return this.accountForm.get('Address.Email'); }
  get mobile() { return this.accountForm.get('Address.Mobile'); }
}