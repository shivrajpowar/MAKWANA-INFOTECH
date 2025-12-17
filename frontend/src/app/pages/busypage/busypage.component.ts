import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-busypage',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './busypage.component.html',
  styleUrls: ['./busypage.component.css']
})
export class BusypageComponent {

  constructor(private router: Router) {}

  // LOGIN FLAG
  isLoggedIn = true;

  // MAIN MENU STATES
  menuOpen = false;
  adminOpen = false;
  transactionOpen = false;

  // ADMIN
  accountOpen = false;
  itemOpen = false;

  // TRANSACTIONS
  salesOrderOpen = false;
  salesOpen = false;
  receiptOpen = false;

  /* ================= ADMIN ================= */

  toggleAdmin(event: Event) {
    event.preventDefault();
    this.adminOpen = !this.adminOpen;

    // close others
    this.transactionOpen = false;
    this.accountOpen = false;
    this.itemOpen = false;
  }

  toggleAccount(event: Event) {
    event.stopPropagation();
    this.accountOpen = !this.accountOpen;
    this.itemOpen = false;
  }

  toggleItem(event: Event) {
    event.stopPropagation();
    this.itemOpen = !this.itemOpen;
    this.accountOpen = false;
  }

  /* ================= TRANSACTIONS ================= */

  toggleTransaction(event: Event) {
    event.preventDefault();
    this.transactionOpen = !this.transactionOpen;

    // close others
    this.adminOpen = false;
    this.resetTransactionChildren();
  }

  toggleSalesOrder(event: Event) {
    event.stopPropagation();
    this.salesOrderOpen = !this.salesOrderOpen;
    this.salesOpen = false;
    this.receiptOpen = false;
  }

  toggleSales(event: Event) {
    event.stopPropagation();
    this.salesOpen = !this.salesOpen;
    this.salesOrderOpen = false;
    this.receiptOpen = false;
  }

  toggleReceipt(event: Event) {
    event.stopPropagation();
    this.receiptOpen = !this.receiptOpen;
    this.salesOrderOpen = false;
    this.salesOpen = false;
  }

  /* ================= COMMON ================= */

  closeMenu() {
    this.menuOpen = false;
  }

  closeAll() {
    this.menuOpen = false;
    this.adminOpen = false;
    this.transactionOpen = false;

    this.accountOpen = false;
    this.itemOpen = false;

    this.resetTransactionChildren();
  }

  resetTransactionChildren() {
    this.salesOrderOpen = false;
    this.salesOpen = false;
    this.receiptOpen = false;
  }

  // LOGOUT
  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
