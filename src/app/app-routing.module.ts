import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';


import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChildrenComponent } from './pages/children/children.component';
import { ChildrenDetailComponent } from './pages/children-detail/children-detail.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'children', component: ChildrenComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'edit-child/:id', component: ChildrenDetailComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'add-child', component: ChildrenDetailComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
