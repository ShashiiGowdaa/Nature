import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:4000'; // JSON Server URL

  constructor(private http: HttpClient) {}

  getSaplings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/saplings`);
  }
  getSeeds(): Observable<any>{
    return this.http.get(`${this.apiUrl}/seeds`)
  }
  getTools(): Observable<any>{
    return this.http.get(`${this.apiUrl}/tools`)
  }
  getManure(): Observable<any>{
    return this.http.get(`${this.apiUrl}/manure`)
  }
  getBestSellingItems(): Observable<any> {
    return forkJoin({
      saplings: this.http.get<any[]>(`${this.apiUrl}/saplings`),
      seeds: this.http.get<any[]>(`${this.apiUrl}/seeds`),
      tools: this.http.get<any[]>(`${this.apiUrl}/tools`),
      manure: this.http.get<any[]>(`${this.apiUrl}/manure`)
    }).pipe(
      map((allProducts) => {
        return {
          saplings: allProducts.saplings.filter(product => product.rating === 4.9),
          seeds: allProducts.seeds.filter(product => product.rating === 4.9),
          tools: allProducts.tools.filter(product => product.rating === 4.9),
          manure: allProducts.manure.filter(product => product.rating === 4.9)
        };
      })
    );
  }
  getFeaturedItems(): Observable<any> {
    return forkJoin({
      saplings: this.http.get<any[]>(`${this.apiUrl}/saplings`),
      seeds: this.http.get<any[]>(`${this.apiUrl}/seeds`),
      tools: this.http.get<any[]>(`${this.apiUrl}/tools`),
      manure: this.http.get<any[]>(`${this.apiUrl}/manure`)
    }).pipe(
      map((allProducts) => {
        return {
          saplings: allProducts.saplings.filter(product => product.rating === 4.5),
          seeds: allProducts.seeds.filter(product => product.rating === 4.5),
          tools: allProducts.tools.filter(product => product.rating === 4.5),
          manure: allProducts.manure.filter(product => product.rating === 4.5)
        };
      })
    );
  }
}
