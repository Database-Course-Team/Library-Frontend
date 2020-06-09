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
  curMode = 'login';

  inputId = '';
  inputPassword = '';

  registerName = '';
  registerPassword = '';
  registerEmail = '';
  registerTel = '';
  registerRole = '';

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

  switch() {
    if (this.curMode === 'login') {
      this.curMode = 'register';
    } else if (this.curMode === 'register') {
      this.curMode = 'login';
    }
  }

  register() {
    this.apiService.register({
      Name: this.registerName,
      Password: this.registerPassword,
      Email: this.registerEmail,
      Tel: this.registerTel,
      Role: parseInt(this.registerRole, 10)
    })
      .subscribe(response => {
        const data = response.json();
        if (data.Status === 'success') {
          this.curMode = 'login';
          console.log(data);
          this.message.success(`注册成功，注册ID为${data.Data[0].Id}`);
        } else {
          this.message.error('注册失败');
        }
      });
  }

}
