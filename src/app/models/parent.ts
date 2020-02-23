import { DatabaseObject } from './database-object';
import { Child } from './child';
export interface Parent extends DatabaseObject {
    childIds: string;
    firstName: string;
    lastName: string;
}
