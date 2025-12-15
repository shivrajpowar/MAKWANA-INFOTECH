import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busy-mobile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busy-mobile.component.html',
  styleUrls: ['./busy-mobile.component.css']
})
export class BusyMobileComponent {

  // SCREEN STATE
  showRegister = false;

  // ================= LOGIN FIELDS =================
  loginUserType: string = '';
  loginEmail: string = '';
  loginPassword: string = '';

  // ================= REGISTER FIELDS =================
  registerUserType: string = '';
  firstName: string = '';
  lastName: string = '';
  regEmail: string = '';
  mobile: string = '';
  company: string = '';
  address: string = '';
  country: string = '';
  state: string = '';
  district: string = '';
  registerPassword: string = '';
  registerRePassword: string = '';
  otp: string = '';

  constructor(private router: Router) {}

  // ================= FORM SUBMIT =================
  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    // ---------- LOGIN ----------
    if (!this.showRegister) {
      console.log('Login Data:', {
        userType: this.loginUserType,
        email: this.loginEmail,
        password: this.loginPassword
      });

      this.router.navigate(['/busypage']);
      return;
    }

    // ---------- REGISTER ----------
    if (this.registerPassword !== this.registerRePassword) {
      return;
    }

    console.log('Register Data:', {
      userType: this.registerUserType,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.regEmail,
      mobile: this.mobile,
      company: this.company,
      address: this.address,
      country: this.country,
      state: this.state,
      district: this.district,
      password: this.registerPassword,
      otp: this.otp
    });

    alert('Registered Successfully!');
    this.closeRegister();
    form.resetForm();
  }

  // ================= UI ACTIONS =================
  openRegister() {
    this.showRegister = true;
  }

  closeRegister() {
    this.showRegister = false;
  }
}
