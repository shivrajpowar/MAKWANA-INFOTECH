import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-order',
  standalone: true,                 // ✅ MUST
  imports: [CommonModule, FormsModule],
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'] // ✅ FIX
})
export class PlaceOrderComponent implements OnInit {

  cartItems: any[] = [];
  total = 0;

  // delivery form data
  name = '';
  mobile = '';
  address = '';

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();

    if (this.cartItems.length === 0) {
      this.router.navigate(['/products']);
    }
  }

  confirmOrder() {

    if (!this.name || !this.mobile || !this.address) {
      alert('Please fill all delivery details');
      return;
    }

    alert('✅ Order placed successfully!');

    this.cartService.clearCart();   // ✅ cart empty
    this.router.navigate(['/products/payment-method']);

  }
}
