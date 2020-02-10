import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Child } from '../models/child';
import { ChildrenService } from '../children.service';
import * as moment from 'moment';

@Component({
  selector: 'app-children-detail',
  templateUrl: './children-detail.component.html',
  styleUrls: ['./children-detail.component.css']
})
export class ChildrenDetailComponent implements OnInit {
  public childForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    dob: new FormControl('', [Validators.required])
  });
  constructor(
    private childrenService: ChildrenService,
    private location: Location) { }

  ngOnInit(): void {
  }

  public addChild(): void {
    if (this.childForm.invalid) {
      console.error('it is invalid');
      return;
    }
    const dobVal: moment.Moment = this.childForm.get('dob').value;
    const child: Child = {
      firstName: this.childForm.get('firstName').value,
      lastName: this.childForm.get('lastName').value,
      dob: dobVal.toDate()
    };
    this.childrenService.AddChild(child);
    this.location.back();
  }
}
