import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

declare var bootstrap: any; // Required for Bootstrap 5 modal

@Component({
  selector: 'app-cart',
    standalone: true, 
  imports: [CommonModule, FormsModule,],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']  // ✅ Corrected
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  // Modal related
  itemToRemove: any = null;
  modalInstance: any;
   

 constructor(
  private cartService: CartService,
  private router: Router   // ✅ ADD THIS
) {}


  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.updateTotal();

    // Initialize Bootstrap modal
    const modalEl = document.getElementById('removeModal');
    if (modalEl) {
      this.modalInstance = new bootstrap.Modal(modalEl, { keyboard: false });
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

  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.updateTotal();
  }

  updateTotal() {
    this.total = this.cartService.getTotal();
  }

  // Open modal for remove confirmation
  openRemoveModal(index: number) {
    this.itemToRemove = this.cartItems[index];
    this.modalInstance.show();
  }

  // Confirm remove from modal
  confirmRemove() {
    const index = this.cartItems.indexOf(this.itemToRemove);
    if (index > -1) {
      this.cartService.removeItem(index);
      this.updateTotal();
    }
    this.modalInstance.hide();
  }
  goToPlaceOrder() {
  this.router.navigate(['/products/place-order']);
}

}
