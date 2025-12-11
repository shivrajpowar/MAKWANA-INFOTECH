import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-summary',
  imports: [UpperCasePipe],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
})
export class SummaryComponent {
qty = localStorage.getItem('qty') || 1;
  userAddress = JSON.parse(localStorage.getItem('userAddress') || '{}');
  paymentMethod = localStorage.getItem('paymentMethod');

}
