import { firestore } from 'firebase';
import { CollectionPointer } from './collection-pointer';
import { Parent } from '../../models/parent';
import { DbObject } from './db-object';

export interface IDbParent extends DbObject<Parent, IDbParent> {
    childIds: firestore.CollectionReference<CollectionPointer>;
    firstName: string;
    lastName: string;
}

export class DbParent implements IDbParent {
    childIds: firestore.CollectionReference<CollectionPointer>; firstName: string;
    lastName: string;
    updatedAt?: firestore.Timestamp;
    createdAt?: firestore.Timestamp;
    id?: string;

    toUiModel(): Parent {
        return {
            ...this,
            childIds: this.childIds.path,
            updatedAt: this.updatedAt?.toDate(),
            createdAt: this.createdAt?.toDate()
        };
    }
    fromUiModel(uiModel: Parent) {
        const parent: DbParent = {
            ...this,
            ...uiModel,
            updatedAt: firestore.Timestamp.fromDate(uiModel.updatedAt),
            createdAt: firestore.Timestamp.fromDate(uiModel.createdAt)
        };
        return parent;
    }
}
