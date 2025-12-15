import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-method.component.html'
})
export class PaymentMethodComponent {
  method = '';

  constructor(private router: Router) {}

  payNow() {
    if (!this.method) {
      alert('Please select a payment method');
      return;
    }

    alert(`Payment method selected: ${this.method}`);
    this.router.navigate(['/products/order-success']);
  }
}
