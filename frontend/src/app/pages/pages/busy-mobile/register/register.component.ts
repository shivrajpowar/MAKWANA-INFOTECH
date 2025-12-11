import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.form = this.fb.group({
      userType: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      companyName: [''],
      address: [''],
      password: [''],
      repassword: ['']
    });
  }
  submit() {
    console.log('register', this.form.value);
  }
}