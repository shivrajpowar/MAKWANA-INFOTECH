import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  total = 0;

  itemToRemove: any = null;
  modalInstance: any;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.updateTotal();

    const modalEl = document.getElementById('removeModal');
    if (modalEl) {
      this.modalInstance = new bootstrap.Modal(modalEl);
    }
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

  updateTotal() {
    this.total = this.cartService.getTotal();
  }

  openRemoveModal(index: number) {
    this.itemToRemove = this.cartItems[index];
    this.modalInstance.show();
  }

  confirmRemove() {
    const index = this.cartItems.indexOf(this.itemToRemove);
    if (index > -1) {
      this.cartService.removeItem(index);
      this.updateTotal();
    }
    this.modalInstance.hide();
  }

  // ✅ PLACE ORDER LOGIC (LOGIN CHECK)
  goToPlaceOrder() {
    const user = localStorage.getItem('user');

    if (user) {
      // User logged in → go directly
      this.router.navigate(['/products/checkout']);
    } else {
      // User not logged in → show login first
      this.router.navigate(
        ['/products/checkout'],
        { queryParams: { login: true } }
      );
    }
  }
}
