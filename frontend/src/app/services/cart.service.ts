import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: any[] = [];

  constructor() {}

  addToCart(product: any) {
    const existingItem = this.cartItems.find(
      item => item.id === product.id
    );

    if (existingItem) {
      existingItem.qty++;
    } else {
      this.cartItems.push({
        ...product,
        qty: 1
      });
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }

  getTotal() {
    return this.cartItems.reduce(
      (total, item) => total + (item.price * item.qty),
      0
    );
  }

  // ✅ ADD THIS (THIS FIXES YOUR ERROR)
  clearCart() {
    this.cartItems = [];
  }
}
