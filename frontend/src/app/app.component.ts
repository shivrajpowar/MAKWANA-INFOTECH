import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { CommonModule } from '@angular/common';
import { BusyMobileComponent } from './pages/pages/busy-mobile/busy-mobile.component';
import { FooterComponent } from './pages/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent,FooterComponent, BusyMobileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'frontend';
  isLoginPage = false;
  showLayout = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        // Hide layout (header/footer) on login page
        this.isLoginPage = this.router.url.includes('login');

        // Hide layout (header/footer) on /busy-mobile
        this.showLayout = event.url !== '/busy-mobile';
      }
    });
  }
  currentPage = 'home';
  goToPage(page: string) {
    this.currentPage = page;
  }
}


