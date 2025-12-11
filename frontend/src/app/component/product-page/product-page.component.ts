import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  imports:[CommonModule,FormsModule]
})
export class ProductPageComponent {
qty: number = 1;

  constructor(private router: Router) { }

  checkLogin() {
    const user = localStorage.getItem('user');
    return !!user; // if user exists return true
  }

  addToCart() {
    if (!this.checkLogin()) {
      this.router.navigate(['/login']);
      return;
    }

    // go to place order page
    this.router.navigate(['/place-order']);
  }

  buyNow() {
    this.addToCart(); // same behavior
  }
}
