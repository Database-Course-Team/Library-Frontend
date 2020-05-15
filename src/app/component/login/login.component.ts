import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  inputId = '';
  inputPassword = '';

  constructor(private apiService: ApiService,
              private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.apiService.login({Id: parseInt(this.inputId, 10), Password: this.inputPassword})
      .subscribe(response => {
        const data = response.json();
        if (data.Status === 'success') {
          localStorage.setItem('curUser', this.inputId);
          console.log(data);
        }
        this.router.navigate(['/']);
      });
  }

}
