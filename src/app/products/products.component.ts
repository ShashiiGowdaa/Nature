import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { ProductService } from '../products.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule, FooterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  constructor(private router: Router, private productService: ProductService) {}

  bestSellingItems: any ={}
  ngOnInit(): void {
    this.productService.getFeaturedItems().subscribe(
      (data) => {
        this.bestSellingItems = data;
        console.log('Best Selling Items:', this.bestSellingItems);
      },
      (error) => {
        console.error('Error fetching best selling items:', error);
      }
    );
  }
  scrollLeft() {
    const carousel = document.getElementById('carousel');
    if (carousel) {
      carousel.scrollBy({ left: -220, behavior: 'smooth' });
    }
  }

  scrollRight() {
    const carousel = document.getElementById('carousel');
    if (carousel) {
      carousel.scrollBy({ left: 220, behavior: 'smooth' });
    }
  }
}
