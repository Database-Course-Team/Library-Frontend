import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api/api.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  inputId = '';
  inputPassword = '';

  constructor(private apiService: ApiService,
              private router: Router,
              private message: NzMessageService) { }

  ngOnInit(): void {
  }

  login() {
    this.apiService.login({Id: parseInt(this.inputId, 10), Password: this.inputPassword})
      .subscribe(response => {
        const data = response.json();
        if (data.Status === 'success') {
          localStorage.setItem('curUser', this.inputId);
        } else {
          this.message.error(data.Detail);
        }
        this.router.navigate(['/']);
      });
  }

}
