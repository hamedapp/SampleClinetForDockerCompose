import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../models/customer.model';

const baseUrl = 'http://localhost:17930/api/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }
  constructor(private http: HttpClient) { }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(baseUrl+ '/GetAll', this.httpOptions);
  }

  get(id: any): Observable<Customer> {
    return this.http.get(`${baseUrl}/get?id=${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl+ '/Add', data);
  }

  update(id: any, data: any): Observable<any> {
    data.id = id;
    return this.http.post(`${baseUrl}/Update`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl+ '/delete'}?Id=${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
}
