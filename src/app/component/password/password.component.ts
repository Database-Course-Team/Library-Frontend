import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '../../service/api/api.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.less']
})
export class PasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  curUser = '';

  constructor(private apiService: ApiService,
              private message: NzMessageService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.curUser = localStorage.getItem('curUser');
    this.changePasswordForm = this.fb.group({
      UserId: parseInt(this.curUser, 10),
      OldPassword: '',
      NewPassword: ''
    });
  }

  changePassword() {
    this.apiService.changePassword(this.changePasswordForm.value)
      .subscribe(response => {
        const data = response.json();
        if (data.Status === 'success') {
          this.message.success(data.Detail);
          this.changePasswordForm.setValue({
            UserId: parseInt(this.curUser, 10),
            OldPassword: '',
            NewPassword: ''
          });
        } else {
          this.message.error(data.Detail);
          this.changePasswordForm.setValue({
            UserId: parseInt(this.curUser, 10),
            OldPassword: '',
            NewPassword: ''
          });
        }
      });
  }

}
