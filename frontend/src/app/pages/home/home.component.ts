import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{
  
  slides = [
    // 'assets/imgi_57_55_busyaccounting.jpg',
    'assets/imgi_58_55_busyaccountingeinvoice.jpg',
    'assets/imgi_59_55_busyaccountinggstbilling.jpg',
    'assets/imgi_60_55_busyaccountingeffortlessgstr.jpg',
    'assets/imgi_61_55_busyaccountinggstcomplianc1.jpg',
    'assets/imgi_62_55_busyaccountingdatasecurity.jpg',
    'assets/imgi_63_55_busyaccountingclaim.jpg',

  ];

  currentIndex = 0;
  intervalId: any;
  startX = 0;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 3000);
  }

  next() {
    this.currentIndex =
      (this.currentIndex + 1) % this.slides.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(i: number) {
    this.currentIndex = i;
  }

  // 👇 TOUCH SWIPE
  @HostListener('touchstart', ['$event'])
  onTouchStart(e: TouchEvent) {
    this.startX = e.touches[0].clientX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(e: TouchEvent) {
    const endX = e.changedTouches[0].clientX;
    if (this.startX - endX > 50) this.next();
    if (endX - this.startX > 50) this.prev();
  }
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  goToProduct(){}
}
