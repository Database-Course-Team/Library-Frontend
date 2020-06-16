import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api/api.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-giveback',
  templateUrl: './giveback.component.html',
  styleUrls: ['./giveback.component.less']
})
export class GivebackComponent implements OnInit {
  records = [];

  constructor(private apiService: ApiService,
              private message: NzMessageService) { }

  ngOnInit(): void {
    this.getBorrowInfo();
  }

  getBorrowInfo() {
    this.apiService.getBorrowInfo(localStorage.getItem('curUser'))
      .subscribe(response => {
        const data = response.json();
        this.records = data.Data;
      });
  }

  giveback(bookid) {
    const userId = localStorage.getItem('curUser');
    this.apiService.giveBack({UserId: parseInt(userId, 10), BookId: [parseInt(bookid, 10)]})
      .subscribe(response => {
        const data = response.json();
        if (data.Status === 'success') {
          this.getBorrowInfo();
          this.message.success('还书成功');
        } else {
          this.getBorrowInfo();
          this.message.error('还书失败');
        }
      });
  }

}
