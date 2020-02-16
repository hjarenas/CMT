import { firestore } from 'firebase';
import { DatabaseObject } from './database-object';
import { CollectionPointer } from './collection-pointer';
export interface Parent extends DatabaseObject {
    childIds: firestore.CollectionReference<CollectionPointer>;
    firstName: string;
    lastName: string;
}
