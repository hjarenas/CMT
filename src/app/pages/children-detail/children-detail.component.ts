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
  private child: Child;

  constructor(
    private route: ActivatedRoute,
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
      dob: dobVal.toDate()
    };
    const saved = this.child
      ? await this.childrenService.Update(child)
      : await this.childrenService.Add(child);
    if (saved) {
      this.location.back();
    }
  }
}
