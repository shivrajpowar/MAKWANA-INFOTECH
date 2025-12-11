import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './place-order.component.html'
})
export class PlaceOrderComponent {

  qty = localStorage.getItem('qty') || 1;

  constructor(private router: Router) {}

  goToAddress() {
    this.router.navigate(['/add-address']);
  }
}
