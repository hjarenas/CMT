import { firestore } from 'firebase';
import { DatabaseObject } from './database-object';
import { CollectionPointer } from './collection-pointer';
export interface Child extends DatabaseObject {
    firstName: string;
    lastName: string;
    dob: Date | firestore.Timestamp;
    parents?: firestore.CollectionReference<CollectionPointer>;
}
