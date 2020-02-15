import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import 'firebase/firestore';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Child } from 'src/app/models/child';
import { SnackbarService } from './snackbar.service';
import { CrudService } from './interfaces/crud-service';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService implements CrudService<Child, string>{
  private childrenCollection: AngularFirestoreCollection<Child>;
  private children$: Observable<Child[]>;
  constructor(
    private db: AngularFirestore,
    private snackbarService: SnackbarService
  ) { }

  public Get(id: string): Observable<Child> {
    return this.children$.pipe(
      map(list => {
        let child = list.find(c => c.id === id);
        child = this.pipeDate(child);
        return child;
      })
    );
  }

  public List(): Observable<Child[]> {
    this.childrenCollection = this.db.collection<Child>('children', ref =>
      ref.orderBy('lastName')
    );
    this.children$ = this.childrenCollection.valueChanges();
    return this.children$.pipe(
      tap(e => {
        console.log('new length: ' + e.length);
      }),
      map((value: Child[], index: number) => this.pipeDateList(value, index))
    );
  }
  public async Delete(id: string): Promise<boolean> {
    try {
      await this.childrenCollection.doc(id).delete();
      return true;
    } catch (e) {
      this.snackbarService.showError('There was an issue deleting the child', 'Dismiss');
    }
  }
  public async Add(childInfo: Child): Promise<boolean> {
    const id = this.db.createId();
    childInfo.id = id;
    return await this.addToCollection(childInfo, 'There was an issue saving the kid\'s information', 'Dismiss');
  }

  public async Update(childInfo: Child): Promise<boolean> {
    return await this.addToCollection(childInfo, 'There was an issue updating the child', 'Dismiss');
  }

  private async addToCollection(childInfo: Child, messageOnError: string, actionOnError: string): Promise<boolean> {
    try {
      await this.childrenCollection.doc(childInfo.id).set(childInfo);
      return true;
    } catch (e) {
      console.error(e);
      this.snackbarService.showError(messageOnError, actionOnError);
      return false;
    }
  }

  private pipeDateList(list: Child[], index: number): Child[] {
    list.map(c => {
      return this.pipeDate(c);
    });
    return list;
  }

  private pipeDate(child: Child): Child {
    if (!child || !child.dob) {
      return child;
    }
    const timestamp = child.dob as firestore.Timestamp;
    child.dob = null;
    const newDate = timestamp.toDate();
    child.dob = newDate;
    return child;
  }
}
