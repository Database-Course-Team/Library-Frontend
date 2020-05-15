import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    const curUser = localStorage.getItem('curUser');
    if (curUser) {
      return true;
    } else {
      return false;
    }
  }
}
