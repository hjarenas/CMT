import { Component, OnInit } from '@angular/core';
import { ChildrenService } from 'src/app/services/children.service';
import { Observable } from 'rxjs';
import { Child } from 'src/app/models/child';
import * as moment from 'moment';
import { firestore } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit {

  public children$: Observable<Child[]>;
  constructor(
    private router: Router,
    private childrenService: ChildrenService
  ) { }

  ngOnInit(): void {
    this.children$ = this.childrenService.List();
  }

  public clickEdit(kid: Child) {
    this.router.navigateByUrl('edit-child/' + kid.id);
  }
  public clickRemove(kid: Child) {
    this.childrenService.Delete(kid.id);
  }
  public getAge(kid: Child): string {
    const dob = moment(kid.dob);
    const now = moment();
    const diffYears = now.diff(dob, 'years');
    if (diffYears > 0) {
      return diffYears + ' year(s) old';
    }
    const diffMonths = now.diff(dob, 'months');
    return diffMonths + ' month(s) old';
  }
}
