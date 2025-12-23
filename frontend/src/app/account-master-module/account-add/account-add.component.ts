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
  errorMessage = '';
  successMessage = '';
  createdMasterCode: string = '';
  
  // Available options for dropdowns
  parentGroups = [
    'Sundry Debtors',
    'Sundry Creditors',
    'Bank Accounts',
    'Cash-in-Hand',
    'Fixed Assets',
    'Current Assets',
    'Current Liabilities',
    'Capital Account',
    'Direct Income',
    'Indirect Income',
    'Direct Expenses',
    'Indirect Expenses'
  ];
  
  taxTypes = [
    'Others',
    'Regular',
    'Composition',
    'Unregistered',
    'Consumer'
  ];
  
  typeOfDealerGST = [
    'Registered',
    'Unregistered',
    'Composition',
    'SEZ',
    'Deemed Export',
    'Export'
  ];
  
  reverseChargeTypes = [
    'Not Applicable',
    'Applicable',
    'Partially Applicable'
  ];
  
  inputTypes = [
    'Section 17(5)-ITC None',
    'Section 17(5)-ITC Available',
    'Other'
  ];
  
  gstReturnPeriods = [
    { value: '1', label: 'Monthly' },
    { value: '2', label: 'Quarterly' },
    { value: '3', label: 'Half-Yearly' },
    { value: '4', label: 'Annually' }
  ];

  constructor(
    private fb: FormBuilder,
    private accountService: AccountMasterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.accountForm = this.fb.group({
      // Basic Information
      Name: ['', [Validators.required, Validators.maxLength(100)]],
      Alias: ['', [Validators.maxLength(50)]],
      PrintName: ['', [Validators.maxLength(100)]],
      ParentGroup: ['Sundry Debtors', [Validators.required]],
      BillByBillBalancing: [true],
      
      // Address Information (nested form group)
      Address: this.fb.group({
        Address1: ['', [Validators.required, Validators.maxLength(100)]],
        Address2: ['', [Validators.maxLength(100)]],
        Address3: ['', [Validators.maxLength(100)]],
        Email: ['', [Validators.email, Validators.maxLength(100)]],
        Mobile: ['', [Validators.pattern('^[0-9]{10}$')]],
        WhatsAppNo: ['', [Validators.pattern('^[0-9]{10,12}$')]],
        ITPAN: ['', [
          Validators.required,
          Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')
        ]],
        Contact: ['', [Validators.required, Validators.maxLength(100)]],
        GSTNo: ['', [
          Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')
        ]],
        OF: [''],
        CountryName: ['India'],
        StateName: ['Rajasthan'],
        CityName: ['', [Validators.required]],
        RegionName: [''],
        AreaName: [''],
        ContDeptName: [''],
        PINCode: ['', [
          Validators.required,
          Validators.pattern('^[0-9]{6}$')
        ]],
        Station: [''],
        AccNo: [''],
        TmpMasterCode: [''],
        C4: ['AXIS BANK'],
        C5: ['UTIB0002503']
      }),
      
      // Additional Details
      SupplierType: ['1'],
      PriceLevel: ['@'],
      PriceLevelForPurc: ['@'],
      TaxType: ['Others', [Validators.required]],
      TypeOfDealerGST: ['Registered', [Validators.required]],
      tmpCode: [''],
      tmpParentGrpCode: ['116'],
      ChequePrintName: [''],
      ReverseChargeType: ['Not Applicable'],
      InputType: ['Section 17(5)-ITC None'],
      GSTReturnFilingPeriod: ['1']
    });
  }

  // Convenience getters for easy access to form fields
  get basicInfo() {
    return this.accountForm.controls;
  }

  get addressInfo() {
    return (this.accountForm.get('Address') as FormGroup).controls;
  }

  onSubmit(): void {
    if (this.accountForm.invalid || this.isSubmitting) {
      this.markFormGroupTouched(this.accountForm);
      this.showValidationErrors();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.createdMasterCode = '';

    // Prepare form data
    const formData = this.prepareFormData();
    
    console.log('Submitting form data:', formData);
    console.log('Generated XML:', this.accountService['convertAccountToXML'](formData));

    // Call the service to create account using Busy API (Service Code 5)
    this.accountService.createMasterXML(formData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        console.log('Raw API Response:', response);
        
        // Parse the XML response
        const parsedResponse = this.accountService.parseCreateUpdateResponse(response);
        
        if (parsedResponse.success) {
          this.createdMasterCode = parsedResponse.masterCode;
          this.successMessage = parsedResponse.message || 'Account created successfully!';
          
          if (parsedResponse.masterCode) {
            this.successMessage += ` Master Code: ${parsedResponse.masterCode}`;
          }
          
          // Show success for 5 seconds then redirect
          setTimeout(() => {
            this.router.navigate(['/accounts']);
          }, 5000);
          
        } else {
          this.errorMessage = parsedResponse.error || 'Failed to create account.';
          
          if (parsedResponse.errorCode) {
            this.errorMessage += ` (Error Code: ${parsedResponse.errorCode})`;
          }
          
          if (parsedResponse.errorDescription) {
            this.errorMessage += ` - ${parsedResponse.errorDescription}`;
          }
          
          // Show raw response for debugging
          console.error('API Error Response:', parsedResponse.rawResponse || response);
        }
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('HTTP Error:', error);
        
        // Handle HTTP errors
        if (error.status === 0) {
          this.errorMessage = 'Network error. Please check your connection and proxy configuration.';
        } else if (error.status === 401) {
          this.errorMessage = 'Authentication failed. Please check username/password.';
        } else if (error.status === 400) {
          this.errorMessage = 'Bad request. Please check the form data.';
        } else if (error.status === 500) {
          this.errorMessage = 'Server error. Please try again later.';
        } else {
          this.errorMessage = `Failed to create account. Status: ${error.status}`;
        }
        
        // Show error details for debugging
        console.error('Error details:', error);
      }
    });
  }

  private prepareFormData(): any {
    const formData = this.accountForm.value;
    
    // Clean up empty strings for optional fields
    Object.keys(formData).forEach(key => {
      if (formData[key] === '') {
        formData[key] = null;
      }
    });
    
    // Clean up address fields
    if (formData.Address) {
      Object.keys(formData.Address).forEach(key => {
        if (formData.Address[key] === '') {
          formData.Address[key] = null;
        }
      });
    }
    
    // Ensure required defaults
    if (!formData.BillByBillBalancing) {
      formData.BillByBillBalancing = true;
    }
    
    return formData;
  }

  private showValidationErrors(): void {
    const invalidFields: string[] = [];
    
    Object.keys(this.accountForm.controls).forEach(key => {
      const control = this.accountForm.get(key);
      if (control?.invalid) {
        invalidFields.push(key);
      }
    });
    
    if (invalidFields.length > 0) {
      this.errorMessage = `Please fix errors in: ${invalidFields.join(', ')}`;
    }
  }

  onCancel(): void {
    if (this.accountForm.dirty) {
      if (confirm('Are you sure you want to cancel? Unsaved changes will be lost.')) {
        this.router.navigate(['/accounts']);
      }
    } else {
      this.router.navigate(['/accounts']);
    }
  }

  resetForm(): void {
    if (this.accountForm.dirty) {
      if (confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
        this.accountForm.reset({
          ParentGroup: 'Sundry Debtors',
          BillByBillBalancing: true,
          TaxType: 'Others',
          TypeOfDealerGST: 'Registered',
          SupplierType: '1',
          PriceLevel: '@',
          PriceLevelForPurc: '@',
          tmpParentGrpCode: '116',
          ReverseChargeType: 'Not Applicable',
          InputType: 'Section 17(5)-ITC None',
          GSTReturnFilingPeriod: '1'
        });
        
        const addressGroup = this.accountForm.get('Address') as FormGroup;
        addressGroup.reset({
          CountryName: 'India',
          StateName: 'Rajasthan',
          C4: 'AXIS BANK',
          C5: 'UTIB0002503'
        });
        
        this.errorMessage = '';
        this.successMessage = '';
      }
    }
  }

  // Auto-fill sample data for testing
  fillSampleData(): void {
    this.accountForm.patchValue({
      Name: 'MAKWANA INFOTECH_3',
      Alias: 'makwana_3',
      PrintName: 'MAKWANA INFOTECH PVT LTD',
      ParentGroup: 'Sundry Debtors',
      BillByBillBalancing: true,
      Address: {
        Address1: 'NEAR BOMBY MOTORS CIRCLE, SONI',
        Address2: 'AUTOMOBILE KI GALI, SHITAL COMPLEX',
        Address3: 'Jodhpur, Rajasthan, 342001',
        Email: 'makwanainfotech@gmail.com',
        Mobile: '6377697551',
        WhatsAppNo: '916377697551',
        ITPAN: 'AYEPM2126R',
        Contact: 'VIKRANT MAKWANA',
        GSTNo: '08AYEPM2126R1Z0',
        OF: '',
        CountryName: 'India',
        StateName: 'Rajasthan',
        CityName: 'Jodhpur',
        RegionName: 'Marwar Region',
        AreaName: 'Soni Area',
        ContDeptName: 'Sales',
        PINCode: '342001',
        Station: 'Jodhpur Station',
        AccNo: '917920060439797',
        TmpMasterCode: '',
        C4: 'AXIS BANK',
        C5: 'UTIB0002503'
      },
      SupplierType: '1',
      PriceLevel: '@',
      PriceLevelForPurc: '@',
      TaxType: 'Others',
      TypeOfDealerGST: 'Registered',
      tmpCode: '',
      tmpParentGrpCode: '116',
      ChequePrintName: 'Hemant Bhatt',
      ReverseChargeType: 'Not Applicable',
      InputType: 'Section 17(5)-ITC None',
      GSTReturnFilingPeriod: '1'
    });
  }

  // View generated XML (for debugging)
  viewGeneratedXML(): void {
    const formData = this.prepareFormData();
    const xml = this.accountService['convertAccountToXML'](formData);
    
    // Format XML for display
    const formattedXml = this.formatXML(xml);
    
    // Show in alert or console
    console.log('Generated XML:', formattedXml);
    alert('Generated XML (check console for formatted view):\n\n' + formattedXml);
  }

  private formatXML(xml: string): string {
    // Simple XML formatting
    let formatted = '';
    let indent = '';
    const tokens = xml.split(/(>|<)/);
    
    tokens.forEach(token => {
      if (token === '<') {
        formatted += '\n' + indent + token;
        indent += '  ';
      } else if (token.startsWith('/')) {
        indent = indent.slice(2);
        formatted += '\n' + indent + token;
      } else if (token === '>') {
        formatted += token;
      } else {
        formatted += token;
      }
    });
    
    return formatted.trim();
  }

  // Helper method to mark all fields as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Validate GST Number
  validateGST(): void {
    const gstNo = this.accountForm.get('Address.GSTNo')?.value;
    if (gstNo && gstNo.length === 15) {
      // Simple GST validation
      const pan = gstNo.substring(2, 12);
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      
      if (!panRegex.test(pan)) {
        this.errorMessage = 'Invalid GST Number format';
      } else {
        this.errorMessage = '';
      }
    }
  }
}