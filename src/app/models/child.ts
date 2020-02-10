import { firestore } from 'firebase';
export interface Child {
    firstName: string;
    lastName: string;
    dob: Date | firestore.Timestamp;
}


