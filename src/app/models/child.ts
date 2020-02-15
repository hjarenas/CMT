import { firestore } from 'firebase';
export interface Child {
    id?: string;
    firstName: string;
    lastName: string;
    dob: Date | firestore.Timestamp;
}


