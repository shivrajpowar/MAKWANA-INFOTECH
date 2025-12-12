import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [FormsModule,CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
   // PRICE RANGE DEFAULT VALUES
  minPrice: number = 0;
  maxPrice: number = 100000;

  // Collapse Sections
  isOpen: Record<string, boolean> = {
    brand: false,
    rating: false,
    offers: false,
    discount: false,
    available: false,
    gst: false
  };
  constructor(private router: Router) {}

  toggle(key: string, value: boolean) {
    this.isOpen[key] = value;
  }

  // PRODUCT LIST
 products = [
  { id: 1, title: 'BASIC EDITION', price: 900, img: 'assets/image.png', models: ['Single User - 03 Months'], brand: 'Samsung', rating: 4 },
  { id: 2, title: 'STANDARD EDITION', price: 5400, img: 'assets/image.png', models: ['Single User - 12 Months'], brand: 'LG', rating: 5 },
  { id: 3, title: 'ENTERPRISE EDITION', price: 3600, img: 'assets/image.png', models: ['Single User - 06 Months'], brand: 'Sony', rating: 3 },
];


  filteredProducts = [...this.products];

  // FILTER STATES
  selectedBrands: string[] = [];
  selectedRating: number = 0;

  // BRAND FILTER
  onBrandChange(event: any, brand: string) {
    if (event.target.checked) {
      this.selectedBrands.push(brand);
    } else {
      this.selectedBrands = this.selectedBrands.filter(b => b !== brand);
    }
    this.applyFilters();
  }

  // RATING FILTER
  onRatingChange(event: any, rating: number) {
    this.selectedRating = event.target.checked ? rating : 0;
    this.applyFilters();
  }

  // PRICE FILTER (LIVE UPDATE)
  applyPrice() {
    this.applyFilters();
  }

  // MAIN FILTER LOGIC
  applyFilters() {
    this.filteredProducts = this.products.filter(p => {

      const brandMatch =
        this.selectedBrands.length === 0 ||
        this.selectedBrands.includes(p.brand);

      const ratingMatch =
        this.selectedRating === 0 ||
        p.rating >= this.selectedRating;

      const priceMatch =
        p.price >= this.minPrice && p.price <= this.maxPrice;

      return brandMatch && ratingMatch && priceMatch;
    });
  }

  // CLEAR ALL
  clearAll() {
    this.selectedBrands = [];
    this.selectedRating = 0;
    this.minPrice = 0;
    this.maxPrice = 100000;
    this.filteredProducts = [...this.products];
  }
 
buyNow(productId: number) {
  this.router.navigate(['/products/view-product', productId]); // ✅ correct
}



}
