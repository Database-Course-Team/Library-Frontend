import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  inputId = '';
  inputPassword = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  login() {
    this.apiService.login({Id: this.inputId, Password: this.inputPassword})
      .subscribe(response => {
        const data = response.json();
        if (data.Status === 'success') {
          console.log(data.Detail);
        }
      });
  }

}
