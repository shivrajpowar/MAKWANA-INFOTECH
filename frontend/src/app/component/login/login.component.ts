import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {

   username = "";
  password = "";

  constructor(private router: Router) {}

  login() {
    if (this.username && this.password) {
      localStorage.setItem('user', this.username);
      this.router.navigate(['/place-order']);
    }
  }

}
