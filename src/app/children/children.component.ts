import { Component, OnInit } from '@angular/core';
import { ChildrenService } from '../children.service';
import { Observable } from 'rxjs';
import { Child } from '../models/child';
import * as moment from 'moment';
import { firestore } from 'firebase';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit {

  public children$: Observable<Child[]>;
  constructor(private childrenService: ChildrenService) { }

  ngOnInit(): void {
    this.children$ = this.childrenService.GetChildren();
  }

  public getAge(kid: Child): string {
    let fbDate = kid.dob;
    let originalDate = moment(fbDate);
    if (!originalDate.isValid()) {
      fbDate = fbDate as firestore.Timestamp;
      fbDate = fbDate.toDate();
      originalDate = moment(fbDate);
    }
    const now = moment();
    const diffYears = originalDate.diff(now, 'years');
    if (diffYears > 0) {
      return diffYears + ' year(s) old';
    }
    const diffMonths = originalDate.diff(now, 'months');
    return diffMonths + ' month(s) old';
  }
}
