/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Observable, of } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { DbService } from './db.service';

import { Platform } from '@ionic/angular';

import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: DbService,
    private router: Router,
    private platform: Platform,
    private loadingController: LoadingController,
    private storage: Storage
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => (user ? db.doc$(`users/${user.uid}`) : of(null)))
    );

    this.handleRedirect();
  }

  uid() {
    return this.user$
      .pipe(
        take(1),
        map((u) => u && u.uid)
      )
      .toPromise();
  }

  async anonymousLogin() {
    /// i removed the breaking .auth
    const credential = await this.afAuth.signInAnonymously();
    console.log('user has been added to ', this.storage);
    console.log('the user is', credential.user);
    return await this.updateUserData(credential.user);
  }

  private updateUserData({ uid, email, displayName, photoURL, isAnonymous }) {
    // Sets user data to firestore on login

    const path = `users/${uid}`;

    const data = {
      uid,
      email,
      displayName,
      photoURL,
      isAnonymous,
    };

    return this.db.updateAt(path, data);
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

  setRedirect(val) {
    this.storage.set('authRedirect', val);
  }

  async isRedirect() {
    return await this.storage.get('authRedirect');
  }

  async googleLogin() {
    try {
      let user;
      await this.setRedirect(true);
      const provider = new GoogleAuthProvider();
      // eslint-disable-next-line prefer-const
      user = await this.afAuth.signInWithRedirect(provider);
      return await this.updateUserData(user);
    } catch (err) {
      console.log(err);
    }
  }
  // Handle login with redirect for web Google auth
  private async handleRedirect() {
    if ((await this.isRedirect()) !== true) {
      return null;
    }
    const loading = await this.loadingController.create();
    await loading.present();

    const result = await this.afAuth.getRedirectResult();

    if (result.user) {
      await this.updateUserData(result.user);
    }

    await loading.dismiss();

    await this.setRedirect(false);

    return result;
  }
}
