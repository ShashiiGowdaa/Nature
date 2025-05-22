import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-saplings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FooterComponent],
  templateUrl: './saplings.component.html',
  styleUrl: './saplings.component.css'
})
export class SaplingsComponent implements OnInit {

  saplings: any[] = [];

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.productService.getSaplings().subscribe(data => {
      this.saplings = data;

      this.route.queryParamMap.subscribe(params => {
        const sortBy = params.get('sortBy');
        if (sortBy) {
          this.sortSaplings(sortBy);
        }
      });
    });
  }

  sortSaplings(orderBy: string) {
    if (!this.saplings.length || !this.saplings[0].hasOwnProperty(orderBy)) {
      console.error('Invalid sorting key:', orderBy);
      return;
    }

    this.saplings.sort((a, b) => {
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
