import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  emailOrMobile = '';
  password = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // ✅ If user already logged in → skip login page
    const user = localStorage.getItem('user');
    if (user) {
      this.router.navigate(['/products/checkout']);
    }
  }

  login(): void {
    if (!this.emailOrMobile || !this.password) {
      alert('Please enter Email/Mobile and Password');
      return;
    }

    // ✅ Store login only once
    localStorage.setItem(
      'user',
      JSON.stringify({
        emailOrMobile: this.emailOrMobile,
        loggedIn: true
      })
    );

    // ✅ After login → go to place order
    this.router.navigate(['/products/place-order']);
  }
}
