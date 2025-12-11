import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-address',
  imports: [FormsModule],
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.css'
})
export class AddAddressComponent {
name = "";
mobile = "";
address = "";

constructor(private router: Router) {}

saveAddress() {
  if (this.name && this.mobile && this.address) {
    localStorage.setItem("userAddress", JSON.stringify({
      name: this.name,
      mobile: this.mobile,
      address: this.address
    }));

    this.router.navigate(['/payment']);
  }
}

}
