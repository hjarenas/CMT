import { of } from 'rxjs';
import { AuthPipe } from '@angular/fire/auth-guard/auth-guard';
import { map } from 'rxjs/operators';

const authState: any = {
    displayName: null,
    isAnonymous: true,
    uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
};
export const AngularFireAuthMock: any = {
    auth: jasmine.createSpyObj('auth', {
        signInAnonymously: Promise.reject({
            code: 'auth/operation-not-allowed'
        }),
        // 'signInWithPopup': Promise.reject(),
        // 'signOut': Promise.reject()
    }),
    authState: of(authState)
};
