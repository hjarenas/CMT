import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Child } from 'src/app/models/child';
import { SnackbarService } from './snackbar.service';
import { CrudService } from './interfaces/crud-service';
import { FirestoreService } from './firestore.service';
import { IDbChild, DbChild } from './db-models/db-child';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService implements CrudService<Child, string> {
  private readonly path = 'children';
  constructor(
    private firestoreService: FirestoreService,
    private snackbarService: SnackbarService
  ) {
  }

  public List(): Observable<Child[]> {
    return this.firestoreService.colWithIds$<IDbChild>(this.path)
      .pipe(
        map(col => col.map(c => {
          const uiChild = new DbChild();
          const val = uiChild.toUiModel(c);
          return val;
        }))
      );
  }

  public Get(id: string): Observable<Child> {
    return this.firestoreService.doc$<IDbChild>(this.getPath(id))
      .pipe(
        map(c => {
          const uiChild = new DbChild();
          const val = uiChild.toUiModel(c);
          return val;
        })
      );
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
    const id = this.firestoreService.createId();
    childInfo.id = id;
    return this.addToCollection(childInfo, 'There was an issue saving the child', 'Dismiss');
  }

  public Update(childInfo: Child): Promise<boolean> {
    return this.addToCollection(childInfo, 'There was an issue updating the child', 'Dismiss');
  }

  private async addToCollection(childInfo: Child, messageOnError: string, actionOnError: string): Promise<boolean> {
    try {
      const dbChild = new DbChild().fromUiModel(childInfo);
      await this.firestoreService.set(this.getPath(childInfo.id), dbChild);
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
