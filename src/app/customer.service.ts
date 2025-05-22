import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICustomer } from './Customer';
import { Observable, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private _url: string = 'http://127.0.0.1:3000/customers';

  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ICustomer[]> {
    return this.httpClient.get<ICustomer[]>(this._url);
  }

  postCustomerDetails(customerData: ICustomer): Observable<ICustomer[]> {
    return this.httpClient.post<ICustomer[]>(this._url, customerData);
  }

  updatePassword(userName: string, newPassword: string, confirmNewPassword: string): Observable<ICustomer[]> {
    return this.getCustomers().pipe(
      switchMap((customers) => {
        const customer = customers.find((c) => c.userName === userName);

        if (!customer || !customer.id) {
          console.error(`User not found or missing ID: ${userName}`);
          return throwError(() => new Error('User not found or missing ID'));
        }

        const updatedCustomer = { ...customer, password: newPassword, confirmPassword: confirmNewPassword };

        console.log(`Sending PUT request to: ${this._url}/${customer.id}`);
        console.log('Payload:', updatedCustomer);

        return this.httpClient.put<ICustomer[]>(`${this._url}/${customer.id}`, updatedCustomer).pipe(
          catchError((error) => {
            console.error('Error updating password:', error);
            alert('Error details: ' + error.message);
            return throwError(() => new Error('Failed to update password. Try again later.'));
          })
        );
      })
    );
  }
}
