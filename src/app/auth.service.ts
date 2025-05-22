import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor() {}

  login(): void {
    sessionStorage.setItem('isLoggedIn', 'true');
  }

  logout(): void {
    sessionStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }
}
