import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public fireAuth: AngularFireAuth,
    private router: Router) {
  }
  public async logout() {
    try {
      await this.fireAuth.signOut();
      this.router.navigateByUrl('login');
    } catch (e) {
      console.error(e);
    }
  }
}
