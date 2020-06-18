import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api/api.service';
import {NzMessageService} from 'ng-zorro-antd';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.less']
})
export class BorrowComponent implements OnInit {
  bookInfoForm!: FormGroup;
  bookStoreForm!: FormGroup;
  books = [];
  isbnInfo = [];
  borrowVisible = false;
  newBookVisible = false;
  addBookVisible = false;
  transferVisible = false;
  isbnSearching = false;
  searchInput = '';
  curUser = '';
  curRole = '';
  inputIsbn = '';
  curLocation = '';
  curStoreLocation = '';

  constructor(private apiService: ApiService,
              private message: NzMessageService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.curUser = localStorage.getItem('curUser');
    this.curRole = localStorage.getItem('curRole');
    this.getBooks();
    this.bookInfoForm = this.fb.group({
      Isbn: '',
      BookName: '',
      Author: '',
      Coauthor: '测试',
      Press: '',
      PublishDate: '',
      Location: '',
      Handler: parseInt(this.curUser, 10)
    });
    this.bookStoreForm = this.fb.group({
      Isbn: '',
      BookName: '',
      Author: '',
      Coauthor: '测试',
      Press: '',
      PublishDate: '',
      Location: '',
      Handler: parseInt(this.curUser, 10)
    });
  }

  getBooks(search = '') {
    this.apiService.getBooks(search)
      .subscribe(response => {
        const data = response.json();
        this.books = data.Data;
      });
  }

  search() {
    this.getBooks(this.searchInput);
  }

  // Transfer Books
  showTransferModal(bookid) {
    this.transferVisible = true;
  }
  handleTransferModal() {
    this.transferVisible = false;
  }

  // Add Books
  showAddBookModal(info) {
    this.bookStoreForm.setValue({
      Isbn: info.Isbn,
      BookName: info.BookName,
      Author: info.Author,
      Coauthor: info.Coauthor,
      Press: info.Press,
      PublishDate: info.PublishDate,
      Location: '',
      Handler: parseInt(this.curUser, 10)
    });
    this.addBookVisible = true;
  }
  handleAddBookModal() {
    this.addBookVisible = false;
  }
  addBook() {
    console.log(this.bookStoreForm.value);
  }

  // New Books
  showNewBookModal() {
    this.newBookVisible = true;
    this.bookInfoForm.setValue({
      Isbn: '',
      BookName: '',
      Author: '',
      Coauthor: '测试',
      Press: '',
      PublishDate: '',
      Location: '',
      Handler: parseInt(this.curUser, 10)
    });
  }
  handleNewBookCancel() {
    this.newBookVisible = false;
  }
  searchIsbn() {
    this.isbnSearching = true;
    this.apiService.searchIsbn(this.inputIsbn)
      .subscribe(response => {
        const data = response.json();
        const intToStr = (a: number) => {
          if (a === 0) {
            return '01';
          } else if (a < 10) {
            return '0' + a.toString();
          } else {
            return a.toString();
          }
        };
        if (data.Status === 'success' && data.Data.msg !== '没有信息') {
          const pubdate = new Date(Date.parse(data.Data.result.pubdate));
          this.bookInfoForm.setValue({
            Isbn: this.inputIsbn,
            BookName: data.Data.result.title,
            Author: data.Data.result.author,
            Coauthor: '测试',
            Press: data.Data.result.publisher,
            PublishDate: pubdate.getFullYear().toString() + '-' + intToStr(pubdate.getMonth()),
            Location: this.curLocation,
            Handler: parseInt(this.curUser, 10)
          });
          this.message.success(data.Detail);
          this.isbnSearching = false;
        } else {
          this.bookInfoForm.setValue({
            Isbn: this.inputIsbn,
            BookName: '',
            Author: '',
            Coauthor: '测试',
            Press: '',
            PublishDate: '',
            Location: this.curLocation,
            Handler: parseInt(this.curUser, 10)
          });
          this.message.error('ISBN查找失败，请手动填写以下内容');
          this.isbnSearching = false;
        }
      });
  }
  addNewBook() {
    this.apiService.addNewBook(this.bookInfoForm.value)
      .subscribe(response => {
        const data = response.json();
        if (data.Status === 'success') {
          this.message.success(data.Detail);
          this.getBooks();
          this.newBookVisible = false;
        } else {
          this.message.error(data.Detail);
          this.getBooks();
          this.newBookVisible = false;
        }
      });
  }

  // Borrow Books
  showBorrowModal(isbn) {
    this.apiService.getIsbnInfo(isbn)
      .subscribe(response => {
        const data = response.json();
        this.isbnInfo = data.Data;
      });
    this.borrowVisible = true;
  }
  handleBorrowCancel() {
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
          this.message.success(data.Detail);
          this.borrowVisible = false;
        } else {
          this.message.error(data.Detail);
        }
      });
  }

}
