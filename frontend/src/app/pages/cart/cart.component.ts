import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems: any[] = [];

  constructor(private cart: CartService) {}

  ngOnInit() {
    this.cartItems = this.cart.getCartItems();
  }

  removeItem(i: number) {
    this.cart.removeItem(i);
  }

  updateTotal() {
    return this.cart.getTotal();
  }
}
