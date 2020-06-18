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

  register(user) {
    const body = JSON.stringify(user);
    return this.http.post(`${this.baseUrl}/register`, body);
  }

  getBooks(search = '') {
    return search === '' ?
      this.http.get(`${this.baseUrl}/books`) : this.http.get(`${this.baseUrl}/books?Search=${search}`);
  }

  getIsbnInfo(isbn) {
    return this.http.get(`${this.baseUrl}/bookInfo?Isbn=${isbn}`);
  }

  borrow(info) {
    const body = JSON.stringify(info);
    return this.http.post(`${this.baseUrl}/booksLend`, body);
  }

  getBorrowInfo(userid) {
    return this.http.get(`${this.baseUrl}/booksLend?UserId=${userid}`);
  }

  giveBack(info) {
    const body = JSON.stringify(info);
    return this.http.post(`${this.baseUrl}/return`, body);
  }

  searchIsbn(isbn) {
    return this.http.get(`${this.baseUrl}/isbn?Isbn=${isbn}`);
  }

  addNewBook(info) {
    const body = JSON.stringify(info);
    return this.http.post(`${this.baseUrl}/books`, body);
  }

  reserveBook(info) {
    const body = JSON.stringify(info);
    return this.http.post(`${this.baseUrl}/reservation`, body);
  }

  getHistoryByUser(uid) {
    return this.http.get(`${this.baseUrl}/history?UserId=${uid}`);
  }

  transferBook(info) {
    const body = JSON.stringify(info);
    return this.http.post(`${this.baseUrl}/booksTransfer`, body);
  }
}
