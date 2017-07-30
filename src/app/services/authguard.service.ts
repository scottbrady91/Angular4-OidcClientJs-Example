import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate(): Promise<boolean> {
    return this.authService.isLoggedIn().then(isLoggedIn => {
      if (isLoggedIn) {
        console.log('User Authenticated');
        return true;
      }
      else {
        console.log('User Unauthenticated...');
        this.authService.startAuthentication();
        return false;
      }
    });
  }
}