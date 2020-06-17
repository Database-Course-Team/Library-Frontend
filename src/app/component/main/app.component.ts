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
  curUserName = '';
  curRole = '';

  constructor(private router: Router,
              private authService: AuthService) {
  }

  logout() {
    localStorage.removeItem('curUser');
    localStorage.removeItem('curUserName');
    localStorage.removeItem('curRole');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (this.authService.isLoggedIn()) {
      this.curUserName = localStorage.getItem('curUserName');
      this.curRole = localStorage.getItem('curRole');
      return true;
    } else {
      return false;
    }
  }
}
