import { Component, OnInit } from '@angular/core';
import { ChildrenService } from 'src/app/services/children.service';
import { Observable } from 'rxjs';
import { Child } from 'src/app/models/child';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmActionComponent, ConfirmActionModel } from '../../shared/components/confirm-action/confirm-action.component';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit {

  public children$: Observable<Child[]>;
  constructor(
    private childrenService: ChildrenService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.children$ = this.childrenService.List();
  }

  public clickRemove(kid: Child) {
    const data = new ConfirmActionModel(
      'Remove Child',
      `Are you sure you want to delete ${kid.firstName} ${kid.lastName}?`,
      'Remove');
    const dialogRef = this.dialog.open<ConfirmActionComponent, ConfirmActionModel, boolean>(
      ConfirmActionComponent,
      {data});
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.childrenService.Delete(kid.id);
      }
    });
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
