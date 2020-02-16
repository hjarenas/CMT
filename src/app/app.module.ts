import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ChildrenComponent } from './pages/children/children.component';
import { ChildrenDetailComponent } from './pages/children-detail/children-detail.component';
import { ConfirmActionComponent } from './shared/components/confirm-action/confirm-action.component';
import { ParentDetailComponent } from './pages/parent-detail/parent-detail.component';
import { DocReferencePipePipe } from './pipes/doc-reference-pipe.pipe';
import { FirestoreService } from './services/firestore.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ChildrenComponent,
    ChildrenDetailComponent,
    ConfirmActionComponent,
    ParentDetailComponent,
    DocReferencePipePipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMomentDateModule,
    MatSnackBarModule,
    MatToolbarModule
  ],
  providers: [DatePipe, FirestoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
