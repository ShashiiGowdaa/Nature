import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  bestSellingItems: any = {};
  slides = [
    { image: 'assets/hero_1.jpg', alt: 'Slide 1', title: 'Farming is the best solution of world starvation', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { image: 'assets/hero_2.jpg', alt: 'Slide 2', title: 'Organic vegetables are good for health', description: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo.' },
    { image: 'assets/hero_3.jpg', alt: 'Slide 3', title: 'Providing Fresh Produce Every Single Day', description: 'Beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas.' },
    { image: 'assets/hero_4.jpg', alt: 'Slide 4', title: 'Farming as a Passion', description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.' },
    { image: 'assets/hero_5.jpg', alt: 'Slide 5', title: 'Good Food For All', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' }
  ];
  
  currentSlide = 0;
  autoSlideInterval: any;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getBestSellingItems().subscribe(
      (data) => {
        this.bestSellingItems = data;
        console.log('Best Selling Items:', this.bestSellingItems);
      },
      (error) => {
        console.error('Error fetching best selling items:', error);
      }
    );
  
    this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000);
}
 

  ngOnDestroy(): void {
    clearInterval(this.autoSlideInterval);
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
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
