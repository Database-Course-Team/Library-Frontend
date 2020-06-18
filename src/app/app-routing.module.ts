import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {AuthService} from './service/auth/auth.service';
import {AuthGuardService} from './service/auth/auth-guard.service';
import {BorrowComponent} from './component/borrow/borrow.component';
import {GivebackComponent} from './component/giveback/giveback.component';
import {ReservationComponent} from './component/reservation/reservation.component';
import {HistoryComponent} from './component/history/history.component';
import {PasswordComponent} from './component/password/password.component';


const routes: Routes = [
  {path: '', redirectTo: '/borrow', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'borrow', canActivate: [AuthGuardService], component: BorrowComponent},
  {path: 'giveback', canActivate: [AuthGuardService], component: GivebackComponent},
  {path: 'reservation', canActivate: [AuthGuardService], component: ReservationComponent},
  {path: 'history', canActivate: [AuthGuardService], component: HistoryComponent},
  {path: 'password', canActivate: [AuthGuardService], component: PasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
