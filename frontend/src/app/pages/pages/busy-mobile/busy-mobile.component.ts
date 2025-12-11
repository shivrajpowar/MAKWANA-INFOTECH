
// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-busy-mobile',
//   imports: [CommonModule,FormsModule],
//   templateUrl: './busy-mobile.component.html',
//   styleUrls: ['./busy-mobile.component.css']
// })
// export class BusyMobileComponent {

//   // LOGIN STATES
//   isLoggedIn = false;
//   showRegister = false;
//   showForgot = false;
//   showReset = false;
//   showSuccess = false;

//   // FORGOT PASSWORD DATA
//   loginUsertype='';
//   registerUsertype='';

//   forgotEmail = '';
//   newPassword = '';
//   confirmPassword = '';

//   // LOGIN
//   onLogin() {
//     this.isLoggedIn = true;
//   }

//   // REGISTER
//   openRegister() {
//     this.showRegister = true;
//   }

//   closeRegister() {
//     this.showRegister = false;
//   }

//   onRegister() {
//     alert("Registered Successfully!");
//     this.closeRegister();
//   }

//   // ******** FORGOT PASSWORD ********
//   openForgot() {
//     this.showForgot = true;
//   }

//   sendResetLink() {
//     if (!this.forgotEmail.trim()) {
//       alert("Enter valid Email or Web ID");
//       return;
//     }

//     this.showForgot = false;
//     this.showSuccess = true;

//     // simulate backend request
//     console.log("Reset link sent to:", this.forgotEmail);
//   }

//   // Return to Login
//   goBack() {
//     this.showForgot = false;
//     this.showReset = false;
//     this.showSuccess = false;
//   }

//   // ******** RESET PASSWORD ********
//   resetPassword() {
//     if (!this.newPassword || !this.confirmPassword) {
//       alert("Enter both fields.");
//       return;
//     }

//     if (this.newPassword !== this.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     alert("Password updated successfully!");
//     this.goBack();
//   }

//   // LOGOUT
//   goBackToLogin() {
//     this.isLoggedIn = false;
//   }
// }

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-busy-mobile',
  imports: [CommonModule, FormsModule],
  templateUrl: './busy-mobile.component.html',
  styleUrls: ['./busy-mobile.component.css']
})
export class BusyMobileComponent {

  // LOGIN STATES
  isLoggedIn = false;
  showRegister = false;
  showForgot = false;
  showReset = false;
  showSuccess = false;

  // USER TYPE DROPDOWNS
  userTypes = ['Admin', 'User', 'SubUser'];

  loginUserType: string = '';
  registerUserType: string = '';

  // FORGOT PASSWORD DATA
  forgotEmail = '';
  newPassword = '';
  confirmPassword = '';

  // LOGIN
  onLogin() {
    if (!this.loginUserType) {
      alert("Select User Type");
      return;
    }
    this.isLoggedIn = true;
  }

  // REGISTER
  openRegister() {
    this.showRegister = true;
  }

  closeRegister() {
    this.showRegister = false;
  }

  onRegister() {
    if (!this.registerUserType) {
      alert("Select User Type");
      return;
    }

    alert("Registered Successfully!");
    this.closeRegister();
  }

  // ******** FORGOT PASSWORD ********
  openForgot() {
    this.showForgot = true;
  }

  sendResetLink() {
    if (!this.forgotEmail.trim()) {
      alert("Enter valid Email or Web ID");
      return;
    }

    this.showForgot = false;
    this.showSuccess = true;

    console.log("Reset link sent to:", this.forgotEmail);
  }

  // Return to Login
  goBack() {
    this.showForgot = false;
    this.showReset = false;
    this.showSuccess = false;
  }

  // ******** RESET PASSWORD ********
  resetPassword() {
    if (!this.newPassword || !this.confirmPassword) {
      alert("Enter both fields.");
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert("Password updated successfully!");
    this.goBack();
  }

  // LOGOUT
  goBackToLogin() {
    this.isLoggedIn = false;
  }
}

