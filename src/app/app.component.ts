import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './auth-service.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports:[CommonModule, RouterModule, RouterOutlet]
})
export class AppComponent {

  isLoggedIn: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}

  handleAuthAction(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.logout();
      this.router.navigate(['/']);
    } else {
      this.authService.login();
      this.router.navigate(['/login']);
    }
  }
}
