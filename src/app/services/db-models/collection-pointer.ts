import { firestore } from 'firebase';
import { DbObject } from './db-object';
import { DatabaseObject } from 'src/app/models/database-object';
export interface CollectionPointer extends DbObject<DatabaseObject, CollectionPointer> {
    refId: firestore.DocumentReference<CollectionPointer>;
}
