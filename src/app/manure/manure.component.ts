import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-manure',
  imports: [CommonModule, FooterComponent],
  templateUrl: './manure.component.html',
  styleUrl: './manure.component.css'
})
export class ManureComponent implements OnInit {

  manures: any[] = [];
  sortBy: string | null = null;
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.productService.getManure().subscribe(data => {
      this.manures = data;

      this.route.queryParamMap.subscribe(params => {
        this.sortBy = params.get('sortBy');
        if (this.sortBy) {
          this.sortManures(this.sortBy);
        }
      });
    });
  }

  sortManures(orderBy: string) {
    if (!this.manures.length || !this.manures[0].hasOwnProperty(orderBy)) {
      console.error('Invalid sorting key:', orderBy);
      return;
    }

    this.manures.sort((a, b) => {
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
