import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-tools',
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.css'
})
export class ToolsComponent implements OnInit {

  tools: any[] = [];
  sortBy: string | null = null;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.productService.getTools().subscribe(data => {
      this.tools = data;

      this.route.queryParamMap.subscribe(params => {
        this.sortBy = params.get('sortBy');
        if (this.sortBy) {
          this.sortTools(this.sortBy);
        }
      });
    });
  }

  sortTools(orderBy: string) {
    if (!this.tools.length || !this.tools[0].hasOwnProperty(orderBy)) {
      console.error('Invalid sorting key:', orderBy);
      return;
    }

    this.tools.sort((a, b) => {
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
