import { firestore } from 'firebase';
export interface DatabaseObject {
    updatedAt?: Date | firestore.Timestamp;
    createdAt?: Date | firestore.Timestamp;
    id?: string;
}
