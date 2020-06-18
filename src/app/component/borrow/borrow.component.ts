import {Component, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ApiService} from '../../service/api/api.service';
import {NzMessageService, TransferItem} from 'ng-zorro-antd';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.less']
})
export class BorrowComponent implements OnInit {
  @ViewChild('outlet', {read: ViewContainerRef}) outletRef: ViewContainerRef;
  @ViewChild('trans', {read: TemplateRef}) transRef: TemplateRef<any>;

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
  bookTransfer: TransferItem[] = [];

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
  showTransferModal(isbn) {
    this.apiService.getIsbnInfo(isbn)
      .subscribe(response => {
        const data = response.json();
        const books = data.Data;
        this.bookTransfer = [];
        books.forEach(book => {
          if (book.Location === '图书阅览室') {
            this.bookTransfer.push({
              key: book.Id.toString(),
              title: book.Id.toString(),
              disabled: false,
              direction: 'right'
            });
          } else if (book.Location === '图书流通室') {
            this.bookTransfer.push({
              key: book.Id.toString(),
              title: book.Id.toString(),
              disabled: book.Status === '已借出' ? true : false,
              direction: 'left'
            });
          }
        });
        this.outletRef.clear();
        this.outletRef.createEmbeddedView(this.transRef);
      });
    this.transferVisible = true;
  }
  handleTransferModal() {
    this.transferVisible = false;
  }
  transfer(ret) {
    const arr = [];
    ret.list.forEach(item => {
      arr.push(parseInt(item.key, 10));
    });
    const req = {
      UserId: 0,
      ToCirculate: [],
      ToOnlyRead: []
    };
    if (ret.from === 'left') {
      req.UserId = parseInt(localStorage.getItem('curUser'), 10);
      req.ToOnlyRead = arr;
    } else if (ret.from === 'right') {
      req.UserId = parseInt(localStorage.getItem('curUser'), 10);
      req.ToCirculate = arr;
    }
    this.apiService.transferBook(req)
      .subscribe(response => {
        const data = response.json();
        if (data.Status === 'success') {
          this.getBooks();
          this.message.success(data.Detail);
          this.transferVisible = false;
        } else {
          this.getBooks();
          this.message.error(data.Detail);
          this.transferVisible = false;
        }
      });
  }

  // Add Books
  showAddBookModal(info) {
    const intToStr = (a: number) => {
      if (a === 0) {
        return '01';
      } else if (a < 10) {
        return '0' + a.toString();
      } else {
        return a.toString();
      }
    };
    const pubdate = new Date(Date.parse(info.PublishDate));
    this.bookStoreForm.setValue({
      Isbn: info.Isbn,
      BookName: info.BookName,
      Author: info.Author,
      Coauthor: info.Coauthor,
      Press: info.Press,
      PublishDate: pubdate.getFullYear().toString() + '-' + intToStr(pubdate.getMonth()),
      Location: '',
      Handler: parseInt(this.curUser, 10)
    });
    this.addBookVisible = true;
  }
  handleAddBookModal() {
    this.addBookVisible = false;
  }
  addBook() {
    console.log(JSON.stringify(this.bookStoreForm.value));
    this.apiService.addNewBook(this.bookStoreForm.value)
      .subscribe(response => {
        const data = response.json();
        if (data.Status === 'warning') {
          this.getBooks();
          this.message.success('成功入库');
          this.addBookVisible = false;
        } else {
          this.getBooks();
          this.message.error('入库失败');
          this.addBookVisible = false;
        }
      });
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

  // Reserve Books
  reserve(isbn) {
    this.apiService.reserveBook({
      UserId: parseInt(localStorage.getItem('curUser'), 10),
      Isbn: isbn
    })
      .subscribe(response => {
        const data = response.json();
        if (data.Status === 'success') {
          this.getBooks();
          this.message.success('预约成功，该书目空出后将会通过邮箱通知您');
        } else {
          this.getBooks();
          this.message.error('预约失败，请联系管理员');
        }
      });
  }

}
