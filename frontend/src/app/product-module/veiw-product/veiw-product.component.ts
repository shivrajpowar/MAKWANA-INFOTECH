import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-veiw-product',
  imports: [CommonModule,FormsModule],
  templateUrl: './veiw-product.component.html',
  styleUrl: './veiw-product.component.css'
})
export class VeiwProductComponent  implements OnInit {
  productId: number | null = null;
  productTitle: string = '';
  productCode: string = '';
  productDescription: string = '';
  price: number = 0;
  qty: number = 1;

  // Images
  images: string[] = [];
  mainImage: string = '';

  // Sample products list (सर्व products येथे असणे आवश्यक)
  products = [
    { id: 1, title: 'BASIC EDITION', price: 900, img: 'assets/image.png', code: 'BS-BS-01', description: 'Busy Software Basic Edition - Single User', images: ['assets/image.png', 'assets/image1.png', 'assets/image2.png'] },
    { id: 2, title: 'STANDARD EDITION', price: 5400, img: 'assets/image.png', code: 'BS-BS-02', description: 'Busy Software Standard Edition - Single User', images: ['assets/image.png', 'assets/image1.png', 'assets/image2.png'] },
    { id: 3, title: 'ENTERPRISE EDITION', price: 3600, img: 'assets/image.png', code: 'BS-BS-03', description: 'Busy Software Enterprise Edition - Single User', images: ['assets/image.png', 'assets/image1.png', 'assets/image2.png'] },
  ];
  cartService: any;

  constructor(private route: ActivatedRoute) {}

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

    alert("🛒 Product Added to Cart!");
  }

}
