import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busy-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busy-register.component.html',
  styleUrls: ['./busy-register.component.css']
})
export class BusyRegisterComponent {

  registerUserType = '';
  firstName = '';
  lastName = '';
  regEmail = '';
  mobile = '';
  company = '';
  address = '';
  country = '';
  state = '';
  district = '';
  registerPassword = '';
  registerRePassword = '';
  otp = '';

  constructor(private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid || this.registerPassword !== this.registerRePassword) {
      form.control.markAllAsTouched();
      return;
    }

    console.log('Register Data:', this);
    alert('Registered Successfully!');
    this.router.navigate(['/busy-login']);
  }

  backToLogin() {
    this.router.navigate(['/busy-login']);
  }
}
