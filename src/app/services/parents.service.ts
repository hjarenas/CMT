import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Observable } from 'rxjs';
import { Parent } from '../models/parent';
import { CrudService } from './interfaces/crud-service';
import { SnackbarService } from './snackbar.service';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ParentsService implements CrudService<Parent, string> {
  private readonly path = 'parents';
  constructor(
    private firestoreService: FirestoreService,
    private snackbarService: SnackbarService) { }

  public List(): Observable<Parent[]> {
    return this.firestoreService.colWithIds$(this.path);
  }

  public SearchByFirstName(name: string) {
    const colRef = this.firestoreService.col<Parent>(
      this.path,
      ref => ref
        .where('firstName', '>=', name)
        .where('firstName', '<', name + '\uf8ff'));
    return this.firestoreService.col$(colRef);
  }

  public Get(id: string): Observable<Parent> {
    return this.firestoreService.doc$(this.getPath(id));
  }

  public async Delete(id: string): Promise<boolean> {
    try {
      await this.firestoreService.delete(this.getPath(id));
      return true;
    } catch (e) {
      this.snackbarService.showError(`There was an issue deleting the parent`, 'Dismiss');
    }
  }

  public async Add(parent: Parent): Promise<boolean> {
    const id = this.firestoreService.createId();
    parent.id = id;
    return await this.addToCollection(parent, `There was an issue saving the parent`, 'Dismiss');
  }

  public async Update(parent: Parent): Promise<boolean> {
    return await this.addToCollection(parent, 'There was an issue updating the parent', 'Dismiss');
  }

  private async addToCollection(parent: Parent, messageOnError: string, actionOnError: string): Promise<boolean> {
    try {
      await this.firestoreService.set(this.getPath(parent.id), parent);
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
