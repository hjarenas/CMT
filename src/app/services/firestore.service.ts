import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { firestore } from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import * as firebase from 'firebase';

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore) { }

  col<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.afs.collection(ref, queryFn) : ref;
  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
  }

  doc$<T extends object>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref).snapshotChanges().pipe(map(doc => {
      return this.pipeDates(doc.payload.data() as T);
    }));
  }

  col$<T extends object>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn).snapshotChanges().pipe(map(col => {
      return col.map(a => {
        let obj = a.payload.doc.data() as T;
        obj = this.pipeDates(obj);
        return obj;
      }) as T[];
    }));
  }

  colWithIds$<T extends object>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn).snapshotChanges().pipe(map(col => {
      return col.map(a => {
        const data = this.pipeDates(a.payload.doc.data() as T);
        const id = a.payload.doc.id;
        return { id, ...data };
      }) as T[];
    }));
  }


  set<T>(ref: DocPredicate<T>, data: T) {
    const timestamp = this.timestamp;
    const obj = {
      createdAt: timestamp,
      ...data,
      updatedAt: timestamp
    };
    return this.doc(ref).set(obj);
  }

  delete<T>(ref: DocPredicate<T>) {
    return this.doc(ref).delete();
  }

  private get timestamp() {
    return firestore.FieldValue.serverTimestamp();
  }

  private pipeDates<T extends object>(obj: T): T {
    let newObj = obj; // tslint:disable-line
    const keys = Object.keys(obj);
    keys.map(key => {
      const val = Reflect.get(newObj, key);
      if (val instanceof firestore.Timestamp) {
        Reflect.set(newObj, key, val.toDate());
      }
    });
    return newObj;
  }
}
