import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  imports:[FormsModule]
})
export class AddressComponent {

 name = "";
  mobile = "";
  address = "";

  constructor(private router: Router) {}

  saveAddress() {
    if (this.name && this.mobile && this.address) {
      localStorage.setItem('userAddress', JSON.stringify({
        name: this.name,
        mobile: this.mobile,
        address: this.address
      }));
      this.router.navigate(['/payment']);
    }
  }
}
