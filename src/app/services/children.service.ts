import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Child } from 'src/app/models/child';
import { SnackbarService } from './snackbar.service';
import { CrudService } from './interfaces/crud-service';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService implements CrudService<Child, string> {
  private readonly path = 'children';
  constructor(
    private firestoreService: FirestoreService,
    private db: AngularFirestore,
    private snackbarService: SnackbarService
  ) {
  }

  public List(): Observable<Child[]> {
    return this.firestoreService.colWithIds$(this.path);
  }

  public Get(id: string): Observable<Child> {
    return this.firestoreService.doc$(this.getPath(id));
  }

  public async Delete(id: string): Promise<boolean> {
    try {
      await this.firestoreService.delete(this.getPath(id));
      return true;
    } catch (e) {
      this.snackbarService.showError('There was an issue deleting the child', 'Dismiss');
    }
  }

  public Add(childInfo: Child): Promise<boolean> {
    const id = this.db.createId();
    childInfo.id = id;
    return this.addToCollection(childInfo, 'There was an issue saving the child', 'Dismiss');
  }

  public Update(childInfo: Child): Promise<boolean> {
    return this.addToCollection(childInfo, 'There was an issue updating the child', 'Dismiss');
  }

  private async addToCollection(childInfo: Child, messageOnError: string, actionOnError: string): Promise<boolean> {
    try {
      await this.firestoreService.set(this.getPath(childInfo.id), childInfo);
      return true;
    } catch (e) {
      console.error(e);
      this.snackbarService.showError(messageOnError, actionOnError);
      return false;
    }
  }

  private getPath(id: string) {
    return `${this.path}/${id}`;
  }
}
