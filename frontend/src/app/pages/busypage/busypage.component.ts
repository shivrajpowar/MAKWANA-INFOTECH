import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterEvent, RouterLink } from '@angular/router';

@Component({
  selector: 'app-busypage',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './busypage.component.html',
  styleUrls: ['./busypage.component.css']
})
export class BusypageComponent {
isLoggedIn = true;
menuOpen = false;

adminDropdownOpen = false;
transactionsDropdownOpen = false;
constructor(private router: Router) { }

toggleAdminDropdown(event: Event) {
  event.preventDefault();

  // close other dropdown
  this.transactionsDropdownOpen = false;

  this.adminDropdownOpen = !this.adminDropdownOpen;
}

toggleTransactionsDropdown(event: Event) {
  event.preventDefault();

  // close other dropdown
  this.adminDropdownOpen = false;

  this.transactionsDropdownOpen = !this.transactionsDropdownOpen;
}

closeMenu() {
  this.adminDropdownOpen = false;
  this.transactionsDropdownOpen = false;
  this.menuOpen = false;
}


// LOGOUT
  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}




 
  
