import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-veiw-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './veiw-product.component.html',
  styleUrl: './veiw-product.component.css'
})
export class VeiwProductComponent implements OnInit {

  productId: number | null = null;
  productTitle = '';
  productCode = '';
  productDescription = '';
  price = 0;
  qty = 1;

  images: string[] = [];
  mainImage = '';

  products = [
    { id: 1, title: 'BASIC EDITION', price: 900, img: 'assets/image.png', code: 'BS-BS-01', description: 'Busy Software Basic Edition - Single User', images: ['assets/image.png', 'assets/image1.png', 'assets/image2.png'] },
    { id: 2, title: 'STANDARD EDITION', price: 5400, img: 'assets/image.png', code: 'BS-BS-02', description: 'Busy Software Standard Edition - Single User', images: ['assets/image.png', 'assets/image1.png', 'assets/image2.png'] },
    { id: 3, title: 'ENTERPRISE EDITION', price: 3600, img: 'assets/image.png', code: 'BS-BS-03', description: 'Busy Software Enterprise Edition - Single User', images: ['assets/image.png', 'assets/image1.png', 'assets/image2.png'] }
  ];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router          // ✅ PROPER ROUTER INJECTION
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productId = id ? +id : null;

    const product = this.products.find(p => p.id === this.productId);
    if (product) {
      this.productTitle = product.title;
      this.productCode = product.code;
      this.productDescription = product.description;
      this.price = product.price;
      this.images = product.images;
      this.mainImage = this.images[0];
    }
  }

  changeImage(img: string) {
    this.mainImage = img;
  }

  addToCart() {
    const product = {
      id: this.productId,
      title: this.productTitle,
      price: this.price,
      qty: this.qty,
      image: this.mainImage
    };

    this.cartService.addToCart(product);

    this.router.navigate(['/products/cart']);
   // ✅ NOW WORKS
  }
}
