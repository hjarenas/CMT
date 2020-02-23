import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore, QueryFn } from '@angular/fire/firestore';
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

  col<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.afs.collection(ref, queryFn) : ref;
  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
  }

  doc$<T extends object>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref).snapshotChanges().pipe(map(doc => doc.payload.data() as T));
  }

  col$<T extends object>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn).snapshotChanges().pipe(map(col => {
      return col.map(a => {
        const obj = a.payload.doc.data() as T;
        return obj;
      }) as T[];
    }));
  }

  colWithIds$<T extends object>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn).snapshotChanges().pipe(map(col => {
      return col.map(a => {
        const data = a.payload.doc.data() as T;
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

  createId(): string {
    return this.afs.createId();
  }

  private get timestamp() {
    return firestore.FieldValue.serverTimestamp();
  }
}
