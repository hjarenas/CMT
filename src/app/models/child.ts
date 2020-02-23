import { DatabaseObject } from './database-object';
import { Parent } from './parent';
export interface Child extends DatabaseObject {
    firstName: string;
    lastName: string;
    dob: Date;
    parents?: string | Parent[];
}
