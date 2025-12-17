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
changeImage(_t12: string) {
throw new Error('Method not implemented.');
}

  productId!: number;
  productTitle = '';
  productCode = '';
  productDescription = '';
  price = 0;
  qty = 1;

  images: string[] = [];
  mainImage = '';

  products = [
    {
      id: 1,
      title: 'BASIC EDITION',
      price: 9000,
      code: 'BS-BS-01',
      description: 'Busy Software Basic Edition',
      images: ['assets/image.png']
    },
    {
      id: 2,
      title: 'STANDARD EDITION',
      price: 13500,
      code: 'BS-BS-02',
      description: 'Busy Software Standard Edition',
      images: ['assets/image.png']
    },
    {
      id: 3,
      title: 'ENTERPRISE EDITION',
      price: 18000,
      code: 'BS-BS-03',
      description: 'Busy Software Enterprise Edition',
      images: ['assets/image.png']
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

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

  addToCart() {
    this.cartService.addToCart({
      id: this.productId,
      title: this.productTitle,
      price: this.price,
      qty: this.qty,
      image: this.mainImage
    });

    this.router.navigate(['/products/cart']);
  }

  buyNow() {
    this.router.navigate(['/products/checkout'])
  }
}
