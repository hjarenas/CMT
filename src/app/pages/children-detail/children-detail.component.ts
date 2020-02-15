import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Child } from 'src/app/models/child';
import { ChildrenService } from 'src/app/services/children.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SnackbarService } from '../../services/snackbar.service';

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
  public submitButtonText: string;
  private childId: string;

  constructor(
    private route: ActivatedRoute,
    private childrenService: ChildrenService,
    private location: Location,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.childrenService.Get(id)
        .subscribe(data => this.childForm.setValue({
          firstName: data.firstName,
          lastName: data.lastName,
          dob: moment(data.dob)
        }));
      this.submitButtonText = 'Save Child';
      this.childId = id;
    } else {
      this.submitButtonText = 'Add Child';
    }
  }

  public async saveChild(): Promise<void> {
    if (this.childForm.invalid) {
      this.snackbarService.showError('The data is not valid', 'Dismiss');
      return;
    }
    const dobVal: moment.Moment = this.childForm.get('dob').value;
    const child: Child = {
      firstName: this.childForm.get('firstName').value,
      lastName: this.childForm.get('lastName').value,
      dob: dobVal.toDate(),
      id: this.childId
    };
    const saved = await this.childId
      ? this.childrenService.Update(child)
      : this.childrenService.Add(child);
    if (saved) {
      this.location.back();
    }
  }
}
