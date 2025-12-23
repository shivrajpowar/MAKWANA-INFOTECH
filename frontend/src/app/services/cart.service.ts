import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: any[] = [];
  private buyNowItem: any = null;

  // =========================
  // ADD TO CART
  // =========================
  addToCart(product: any) {
    const existing = this.cartItems.find(
      item => item.id === product.id
    );

    if (existing) {
      existing.qty += product.qty;
    } else {
      this.cartItems.push({ ...product });
    }
  }

  // =========================
  // BUY NOW (single item)
  // =========================
  setBuyNow(product: any) {
    this.buyNowItem = { ...product };
  }

  // =========================
  // GETTERS
  // =========================
  getCartItems() {
    return this.cartItems;
  }

  getBuyNowItem() {
    return this.buyNowItem ? [this.buyNowItem] : [];
  }

  // ✅ BACKWARD COMPATIBLE
  // getTotal()  → cart total
  // getTotal(items) → custom list total
  getTotal(items?: any[]) {
    const data = items ? items : this.cartItems;

    return data.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  }

  // =========================
  // REMOVE ITEM (cart page)
  // =========================
  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }

  // =========================
  // CLEAR METHODS
  // =========================
  clearCart() {
    this.cartItems = [];
  }

  clearAll() {
    this.cartItems = [];
    this.buyNowItem = null;
  }
}
