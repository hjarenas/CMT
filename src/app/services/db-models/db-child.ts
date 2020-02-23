import { firestore } from 'firebase';
import { CollectionPointer } from './collection-pointer';
import { DbObject } from './db-object';
import { Child } from 'src/app/models/child';

export interface IDbChild extends DbObject<Child, IDbChild> {
    firstName: string;
    lastName: string;
    dob: firestore.Timestamp;
    parents?: firestore.CollectionReference<CollectionPointer>;
}

export class DbChild implements IDbChild {
    firstName: string; lastName: string;
    dob: firestore.Timestamp;
    parents?: firestore.CollectionReference<CollectionPointer>;
    updatedAt?: firestore.Timestamp;
    createdAt?: firestore.Timestamp;
    id?: string;
    public toUiModel(dbModel: IDbChild): Child {
        const child =  {
            ...dbModel,
            dob: dbModel.dob?.toDate(),
            parents: dbModel.parents?.path,
            updatedAt: dbModel.updatedAt?.toDate(),
            createdAt: dbModel.createdAt?.toDate()
        };
        return child;
    }
    public fromUiModel(uiModel: Child): IDbChild {
        const child = {
            ...this,
            ...uiModel
        };
        return child;
    }
}
