import { firestore } from 'firebase';
import { DatabaseObject } from './database-object';
export interface CollectionPointer extends DatabaseObject {
    refId: firestore.DocumentReference<CollectionPointer>;
}
