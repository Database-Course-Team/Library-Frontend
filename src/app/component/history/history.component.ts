import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api/api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less']
})
export class HistoryComponent implements OnInit {
  histories = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getHistoryByUser(localStorage.getItem('curUser'))
      .subscribe(response => {
        const data = response.json();
        this.histories = data.Data;
      });
  }

}
