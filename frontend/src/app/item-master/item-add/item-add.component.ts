import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-add',
  imports: [ReactiveFormsModule],
  templateUrl: './item-add.component.html',
  styleUrl: './item-add.component.css'
})
export class ItemAddComponent implements OnInit {
   itemForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      name: ['Premium Notebook', Validators.required],
      alias: ['PNB-001', Validators.required],
      printName: ['Premium Notebook 2025', Validators.required],
      group: ['Stationery', Validators.required],
      stockQty: [150, [Validators.required, Validators.min(0)]],
      stockValue: [4500, [Validators.required, Validators.min(0)]],
      salePrice: [35, [Validators.required, Validators.min(0)]],
      purchasePrice: [30, [Validators.required, Validators.min(0)]],
      mrp: [40, [Validators.required, Validators.min(0)]],
      minSalePrice: [32, [Validators.required, Validators.min(0)]],
      selfValPrice: [35, [Validators.required, Validators.min(0)]],
      extraInfo: ['This is a high-quality notebook suitable for office and school use. Available in multiple colors and sizes.']
    });
  }

  onSave(): void {
    if (this.itemForm.valid) {
      console.log('Form Data:', this.itemForm.value);
      alert('Item saved successfully!');
      // Here you can call a service to save data to backend
    } else {
      alert('Please fill all required fields correctly.');
    }
  }

  onQuit(): void {
    // Reset form or navigate away
    this.itemForm.reset();
    console.log('Form reset / Quit clicked');
  }

}
