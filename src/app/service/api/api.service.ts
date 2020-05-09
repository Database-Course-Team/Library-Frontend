import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:8080';

  constructor(private http: Http) { }

  login(user) {
    const body = JSON.stringify(user);
    return this.http.post(`${this.baseUrl}/login`, body);
  }
}
