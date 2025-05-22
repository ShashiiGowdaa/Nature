import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { ICustomer } from '../Customer';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true
})

export class RegisterComponent {

  constructor(private customerService: CustomerService){}

  registerForm = new FormGroup({
    userName : new FormControl('',Validators.required),
    emailId: new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required, Validators.minLength(6)]),
    confirmPassword : new FormControl('',[Validators.required, Validators.minLength(6)])
  })
  onSubmit() {
    const { userName, emailId, password, confirmPassword } = this.registerForm.value;
  
    if (password == confirmPassword) {
      this.customerService.getCustomers().subscribe(customers => {
        const existingUser = customers.find(customer => customer.userName == userName || customer.emailId == emailId);
        
        if (existingUser) {
          alert(`User is already exists! Please use a different email.`);
        } else {
          const newId = customers.length ? Math.max(...customers.map(c => c.id || 0)) + 1 : 1;

          const customerData: ICustomer = {
            id: newId,
            userName: userName!,
            emailId: emailId!,
            password: password!,
            confirmPassword: confirmPassword!
          };
  
          this.customerService.postCustomerDetails(customerData).subscribe(
            response => {
              console.log(customerData);
              
              alert(`Hi ${customerData.userName}! You are now registered successfully!`);
            },
            error => {
              console.error('Error posting data', error);
              alert('There was an error registering. Please try again.');
            }
          );
        }
      });
    } else {
      alert('Your passwords are not matching!');
    }
  }
  
}
