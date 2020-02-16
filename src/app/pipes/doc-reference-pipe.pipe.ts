import { Pipe, PipeTransform } from '@angular/core';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { FirestoreService } from '../services/firestore.service';

@Pipe({
  name: 'docReferencePipe'
})
export class DocReferencePipePipe<T extends object> implements PipeTransform {
  constructor(private firestoreServcie: FirestoreService) { }

  transform(value: firestore.DocumentReference): Observable<T> {
    return this.firestoreServcie.doc$<T>(value.path);
  }

}
