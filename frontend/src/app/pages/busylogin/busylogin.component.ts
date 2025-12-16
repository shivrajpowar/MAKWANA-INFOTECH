import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busy-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busylogin.component.html',
  styleUrls: ['./busylogin.component.css']
})
export class BusyLoginComponent {

  loginUserType: string = '';
  loginEmail: string = '';
  loginPassword: string = '';

  constructor(private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    console.log('Login Data:', {
      userType: this.loginUserType,
      email: this.loginEmail,
      password: this.loginPassword
    });

    this.router.navigate(['busypage']);
  }

  openRegister() {
    this.router.navigate(['/busy-register']);
  }
}
