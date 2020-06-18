import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api/api.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.less']
})
export class ReservationComponent implements OnInit {
  reservations = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getReservation(localStorage.getItem('curUser'))
      .subscribe(response => {
        const data = response.json();
        this.reservations = data.Data;
      });
  }

  getStatus(d) {
    if (d.ExpireDate === '') {
      return '未到库';
    } else {
      return '已到库';
    }
  }

}
