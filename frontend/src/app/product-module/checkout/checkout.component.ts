import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    currentStep = 1;

  // ✅ LOGIN
  emailOrMobile = '';
  password = '';

  // ✅ ADDRESS
  address = {
    name: '',
    mobile: '',
    address: '',
    city: '',
    pincode: ''
  };

  // ✅ PAYMENT
  selectedPayment = '';

  // ✅ CART DATA (IMPORTANT FOR YOUR ISSUE)
  cartItems: any[] = [];
  total = 0;

  constructor(private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

  const mode = this.route.snapshot.queryParamMap.get('mode');

  if (mode === 'buynow') {
    // ⚡ single item checkout
    this.cartItems = this.cartService.getBuyNowItem();
  } else {
    // 🛒 cart checkout
    this.cartItems = this.cartService.getCartItems();
  }

  this.total = this.cartService.getTotal(this.cartItems);
}

  login() {
    if (!this.emailOrMobile || !this.password) {
      alert('Please enter login details');
      return;
    }
    localStorage.setItem('user', 'loggedIn');
    this.currentStep = 2;
  }

  saveAddress() {
    const { name, mobile, address, city, pincode } = this.address;
    if (!name || !mobile || !address || !city || !pincode) {
      alert('Fill all address fields');
      return;
    }
    this.currentStep = 3;
  }

  confirmSummary() {
    this.currentStep = 4;
  }

  placeOrder() {
  if (!this.selectedPayment) {
    alert('Select payment method');
    return;
  }

  this.cartService.clearAll();
  this.currentStep = 5;
}

}
