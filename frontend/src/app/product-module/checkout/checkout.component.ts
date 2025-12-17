import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  currentStep = 1;

  // LOGIN
  emailOrMobile = '';
  password = '';

  // ADDRESS
  address = {
    name: '',
    mobile: '',
    address: '',
    city: '',
    pincode: ''
  };

  // PAYMENT
  selectedPayment = '';

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentStep = 2;
    }
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
    alert('🎉 Order placed successfully');
    this.currentStep = 5;
  }
}
