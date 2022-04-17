import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const isSignedIn = await this.storage.get('userToken');

    if (!isSignedIn) {
      this.router.navigateByUrl('auth');
    }
    this.router.navigateByUrl('auth');
    return false;
  }
}
