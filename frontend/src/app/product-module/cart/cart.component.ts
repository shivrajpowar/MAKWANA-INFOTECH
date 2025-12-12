import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
 cartItems: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.updateTotal();
  }

  increaseQty(index: number) {
    this.cartItems[index].qty++;
    this.updateTotal();
  }

  decreaseQty(index: number) {
    if (this.cartItems[index].qty > 1) {
      this.cartItems[index].qty--;
      this.updateTotal();
    }
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.updateTotal();
  }

  updateTotal() {
    this.total = this.cartService.getTotal();
  }
  // आधीचा removeItem() function जसा आहे तसाच राहील

confirmRemove(i: number) {
  const isConfirmed = confirm(`Are you sure you want to remove "${this.cartItems[i].title}" from the cart?`);
  if (isConfirmed) {
    this.removeItem(i);
  }
}

// Existing removeItem function:
 
}


