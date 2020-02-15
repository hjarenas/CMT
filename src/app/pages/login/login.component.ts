import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credential: auth.UserCredential;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(8), Validators.required])
  });
  private returnUrl: string;
  constructor(
    public fireAuth: AngularFireAuth,
    private router: Router
  ) {
  }


  ngOnInit(): void {
  }

  async login() {
    var pas = 'firebaseTest123';
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    try {
      this.credential = await this.fireAuth.signInWithEmailAndPassword(username, password);
      this.router.navigateByUrl('');
    } catch (e) {
      console.error(e);
    }
  }

  public getErrorMessage(controlName: string): string {
    const formControl = this.loginForm.get(controlName);
    if (!formControl.invalid) {
      return '';
    } else if (formControl.getError('required')) {
      return `The $(this.controlName) is required`;
    } else if (formControl.getError('email')) {
      return `The email for the field $(this.controlName) is invalid`;
    }
    return 'Unknown error';
  }
  logout() {
    this.fireAuth.signOut();
  }
}
