import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Child } from './models/child';
import 'firebase/firestore';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {
  private childrenCollection: AngularFirestoreCollection<Child>;
  private children$: Observable<Child[]>;
  constructor(private db: AngularFirestore) {
  }

  public GetChildren(): Observable<Child[]> {
    this.childrenCollection = this.db.collection<Child>('children');
    this.children$ = this.childrenCollection.valueChanges();
    return this.children$.pipe(
      tap(e => {
        console.log('new length: ' + e.length);
      }),
      map((value: Child[], index: number) => this.PipeToDate(value, index))
    );
  }

  public PipeToDate(list: Child[], index: number): Child[] {
    list.map(c => {
      if (!c || !c.dob) {
        return c;
      }
      const timestamp = c.dob as firestore.Timestamp;
      c.dob = null;
      const newDate = timestamp.toDate();
      c.dob = newDate;
      return c;
    });
    return list;
  }

  public async AddChild(childInfo: Child) {
    const id = this.db.createId();
    try {
      this.childrenCollection.doc(id).set(childInfo);
    } catch (e) {
      console.error(e);
    }
  }
}
