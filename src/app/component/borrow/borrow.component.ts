import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api/api.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.less']
})
export class BorrowComponent implements OnInit {
  books = [];
  isbnInfo = [];
  borrowVisible = false;

  constructor(private apiService: ApiService,
              private message: NzMessageService) { }

  ngOnInit(): void {
    this.apiService.getBooks()
      .subscribe(response => {
        const data = response.json();
        this.books = data.Data;
      });
  }

  showModal(isbn) {
    this.apiService.getIsbnInfo(isbn)
      .subscribe(response => {
        const data = response.json();
        this.isbnInfo = data.Data;
        console.log(this.isbnInfo);
      });
    this.borrowVisible = true;
  }

  handleCancel() {
    this.borrowVisible = false;
  }

  borrow(bookid) {
    this.apiService.borrow({
      UserId: parseInt(localStorage.getItem('curUser'), 10),
      BookId: [parseInt(bookid, 10)]
    })
      .subscribe(response => {
        const data = response.json();
        if (data.Status === 'success') {
          this.message.success('借书成功');
          this.borrowVisible = false;
        } else {
          this.message.error('借书失败');
        }
      });
  }

}
