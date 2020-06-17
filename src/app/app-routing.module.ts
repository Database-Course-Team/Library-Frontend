import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {AuthService} from './service/auth/auth.service';
import {AuthGuardService} from './service/auth/auth-guard.service';
import {BorrowComponent} from './component/borrow/borrow.component';
import {GivebackComponent} from './component/giveback/giveback.component';


const routes: Routes = [
  {path: '', redirectTo: '/borrow', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'borrow', canActivate: [AuthGuardService], component: BorrowComponent},
  {path: 'giveback', canActivate: [AuthGuardService], component: GivebackComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
