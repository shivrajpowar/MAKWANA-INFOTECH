import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

 isMenuOpen = false; // mobile toggle state

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
 closeMenu() {
    this.isMenuOpen = false;
  }

  

}
