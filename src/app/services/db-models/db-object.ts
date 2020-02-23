import { firestore } from 'firebase';
export interface DbObject<U, D> {
    updatedAt?: firestore.Timestamp;
    createdAt?: firestore.Timestamp;
    id?: string;

    toUiModel(dbModel: D): U;
    fromUiModel(uiModel: U): D;
}
