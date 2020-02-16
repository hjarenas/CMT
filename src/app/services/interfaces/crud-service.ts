import { Observable } from 'rxjs';

/**
 * @param T = ClientTypeModel
 */
export interface CrudService<T, U> {
    List(): Observable<T[]>;
    Get(id: U): Observable<T>;
    Add(data: T): Promise<boolean>;
    Update(data: T): Promise<boolean>;
    Delete(id: U): Promise<boolean>;
}
