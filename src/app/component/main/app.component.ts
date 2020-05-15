import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Library';
  curUser = '';

  constructor(private router: Router,
              private authService: AuthService) {
  }

  logout() {
    localStorage.removeItem('curUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (this.authService.isLoggedIn()) {
      this.curUser = localStorage.getItem('curUser');
      return true;
    } else {
      return false;
    }
  }
}
