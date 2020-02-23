import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Location } from '@angular/common';
import { Child } from 'src/app/models/child';
import { ChildrenService } from 'src/app/services/children.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { SearchParentComponent } from '../../dialogs/search-parent/search-parent.component';
import { Parent } from '../../models/parent';

@Component({
  selector: 'app-children-detail',
  templateUrl: './children-detail.component.html',
  styleUrls: ['./children-detail.component.css']
})
export class ChildrenDetailComponent implements OnInit {
  public childForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    dob: new FormControl('', [Validators.required]),
    // parents: new FormArray([
    //   new FormControl('', [Validators.required, Validators.minLength(2)])
    // ])
  });
  public submitButtonText: string;
  public child: Child;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private childrenService: ChildrenService,
    private location: Location,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.childrenService.Get(id)
        .subscribe(data => {
          this.childForm.setValue({
            firstName: data.firstName,
            lastName: data.lastName,
            dob: moment(data.dob)
          });
          this.child = data;
        }
        );
      this.submitButtonText = 'Save Child';
    } else {
      this.submitButtonText = 'Add Child';
    }
  }

  public async clickAddParent() {
    const dialogRef = this.dialog.open(SearchParentComponent, {
      width: '600px',
      height: '800px',
      minWidth: '40%',
      maxWidth: '100%',
      minHeight: '60%',
      maxHeight: '100%'
    });
    dialogRef.afterClosed().subscribe((result: Parent) => {
      console.log('found this parent' + result);
    });
  }
  public async saveChild(): Promise<void> {
    if (this.childForm.invalid) {
      this.snackbarService.showError('The data is not valid', 'Dismiss');
      return;
    }
    const dobVal: moment.Moment = this.childForm.get('dob').value;
    const child: Child = {
      ...this.child,
      firstName: this.childForm.get('firstName').value,
      lastName: this.childForm.get('lastName').value,
      dob: dobVal.toDate(),
      parents: []
    };
    const saved = this.child
      ? await this.childrenService.Update(child)
      : await this.childrenService.Add(child);
    if (saved) {
      this.location.back();
    }
  }
}
