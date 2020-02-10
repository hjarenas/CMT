import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';


import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChildrenComponent } from './children/children.component';
import { ChildrenDetailComponent } from './children-detail/children-detail.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'children', component: ChildrenComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'add-child', component: ChildrenDetailComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
