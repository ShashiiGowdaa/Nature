import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-seeds',
  imports: [CommonModule, FormsModule, RouterModule, FooterComponent],
  templateUrl: './seeds.component.html',
  styleUrl: './seeds.component.css'
})
export class SeedsComponent implements OnInit {

  seeds: any[] = [];
  sortBy: string | null = null;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.productService.getSeeds().subscribe(data => {
      this.seeds = data;

      this.route.queryParamMap.subscribe(params => {
        this.sortBy = params.get('sortBy');
        if (this.sortBy) {
          this.sortSeeds(this.sortBy);
        }
      });
    });
  }

  sortSeeds(orderBy: string) {
    if (!this.seeds.length || !this.seeds[0].hasOwnProperty(orderBy)) {
      console.error('Invalid sorting key:', orderBy);
      return;
    }

    this.seeds.sort((a, b) => {
      const valA = a[orderBy];
      const valB = b[orderBy];

      if (typeof valA === 'number' && typeof valB === 'number') {
        return valA - valB;
      } else if (typeof valA === 'string' && typeof valB === 'string') {
        return valA.localeCompare(valB); 
      }
      return 0; 
    });

    this.router.navigate([], { 
      queryParams: { sortBy: orderBy }, 
      queryParamsHandling: 'merge' 
    });
  }
}
