import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  imports:[FormsModule]
})
export class PaymentComponent {
   payment = "";

  constructor(private router: Router) {}

  continue() {
    if (!this.payment) return;
    localStorage.setItem('paymentMethod', this.payment);
    this.router.navigate(['/summary']);
  }
}
