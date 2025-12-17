import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-add',
  imports: [ReactiveFormsModule],
  templateUrl: './account-add.component.html',
  styleUrl: './account-add.component.css'
})
export class AccountAddComponent {
accountForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.accountForm = this.fb.group({

      /* Account Details */
      name: ['', Validators .required],
      alias: [''],
      printName: [''],
      parentGroup: ['Sundry Debtors'],
      billByBillBalancing: [false],

      /* Address Details (Nested FormGroup) */
      address: this.fb.group({
        address1: [''],
        address2: [''],
        mobile: ['', Validators.pattern(/^[0-9]{10}$/)],
        whatsappNo: [''],
        itpan: [''],
        gstNo: [''],
        countryName: ['India'],
        stateName: [''],
        areaName: [''],
        accNo: [''],
        bankName: [''],
        ifsc: ['']
      }),

      /* Tax & Other Info */
      taxType: ['Others'],
      typeOfDealerGST: ['Registered'],
      chequePrintName: ['']
    });
  }

  submit(): void {
    if (this.accountForm.valid) {
      console.log('Account Form Data:', this.accountForm.value);
      alert('Account saved successfully!');
      // Call API here
    } else {
      alert('Please fill required fields correctly');
      this.accountForm.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.accountForm.reset();
  }
}
