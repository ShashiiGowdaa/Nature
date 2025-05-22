import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { RouterModule , Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  showForgotPassword: boolean= false
  constructor(
    private customerService: CustomerService, 
    private toastr: ToastrService, 
    private router: Router,
  private authService: AuthService){}
  message: String =''
  loginForm = {userName: '', password:'', newPassword:'', confirmNewPassword:''}

  onSubmit(){
    const { userName, password } = this.loginForm

    this.customerService.getCustomers().pipe(first()).subscribe(customers => {
      console.log("Customers received:", customers);

      if (!customers || customers.length === 0) {
        console.log("No customers found! API might be returning an empty list.");
        this.toastr.error('No user data found!', 'Error',{
          timeOut: 5000,
          progressBar: true,
          closeButton: true
        });;
        return;
      }

      const userExists = customers.some(customer =>
        (customer?.userName?.trim().toLowerCase() || "") === userName.trim().toLowerCase() &&
        customer?.password === password
      );      
      console.log("User Exists?", userExists);
      if(userExists){
        this.toastr.success('Login Successful!', 'Success',{
          timeOut: 5000,
          progressBar: true,
          closeButton: true
        });;
          this.router.navigate(['/home'])
      }
      else{
        console.log("Login failed! Incorrect credentials.");
        this.toastr.error('Incorrect Username or Password!', 'Error');
      }
    });
  }
  forgotPassword(){
    this.showForgotPassword = true
  }
  resetPassword() {
    const { userName, newPassword, confirmNewPassword } = this.loginForm;
    if (!this.loginForm.newPassword || !this.loginForm.confirmNewPassword) {
      this.toastr.error('Please enter a new password!', 'Error');
      return;
    }

    if (this.loginForm.newPassword !== this.loginForm.confirmNewPassword) {
      this.toastr.error('Passwords do not match!', 'Error');
      return;
    }

    

    this.customerService.updatePassword(userName!, newPassword!, confirmNewPassword!).subscribe(      (response) => {
      this.toastr.success('Password updated successfully!', 'Success',{
        timeOut: 5000,
        progressBar: true,
        closeButton: true
      });;  
        this.showForgotPassword = false;
      },
      (error) => {
        this.message = `${error.message}`;
      }
    );
  }
  // navigateToHome(){
  //   this.router.navigate(['/home'])
  // }
}
