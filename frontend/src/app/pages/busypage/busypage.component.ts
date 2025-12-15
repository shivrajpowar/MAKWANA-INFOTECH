import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busypage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busypage.component.html',
  styleUrls: ['./busypage.component.css']
})
export class BusypageComponent {
  isLoggedIn = true;
  menuOpen = false;

  constructor(private router: Router) {}

  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}




  // STATES
//   showRegister = false;
//   showForgot = false;
//   showReset = false;
//   showSuccess = false;

//   // LOGIN + REGISTER
//   loginUserType = '';
//   registerUserType = '';

//   // PASSWORD FLOW
//   forgotEmail = '';
//   newPassword = '';
//   confirmPassword = '';
//   isLoggedIn: false = false;
//   loggedName: null | undefined;
//   loggedRole: null | undefined;
//   loginForm: any;
//   selectedRole: string | undefined;

// logout(): void {
//   this.isLoggedIn = false;
//   this.loggedRole = null;
//   this.loggedName = null;

//   // Reset UI states
//   this.showRegister = false;
//   this.showForgot = false;
//   this.showReset = false;
//   this.showSuccess = false;

//   // Navigate to Home
//   this.router.navigate(['/']);
// }



//   constructor(private router: Router) {}

//   onLogin() {
//   if (!this.loginUserType) {
//     alert("Please select User Type");
//     return;
//   }

//   // // ✅ SET LOGIN STATE
//   // this.isLoggedIn = true;
//   // this.loggedRole = this.loginUserType;
//   // this.loggedName = 'User';

//   // // Redirect to Dashboard
//   // this.router.navigate(['/busy']);
// }

//   // CREATE ACCOUNT
//   onRegister() {
//     if (!this.registerUserType) {
//       alert("Please select User Type");
//       return;
//     }

//     alert("Registration Successful!");

//     // Redirect to Dashboard
//     this.router.navigate(['/busy']);
//   }

//   // FORGOT PASSWORD
//   openForgot() {
//     this.showForgot = true;
//   }

//   sendResetLink() {
//     if (!this.forgotEmail.trim()) {
//       alert("Enter valid email or ID");
//       return;
//     }

//     this.showForgot = false;
//     this.showSuccess = true;
//   }

//   goBack() {
//     this.showForgot = false;
//     this.showReset = false;
//     this.showSuccess = false;
//     this.showRegister = false;
//   }

//   resetPassword() {
//     if (!this.newPassword || !this.confirmPassword) {
//       alert("Enter both fields");
//       return;
//     }

//     if (this.newPassword !== this.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     alert("Password updated!");
//     this.goBack();
//   }
  
