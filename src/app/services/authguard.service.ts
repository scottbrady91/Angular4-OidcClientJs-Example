import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService) { } 
  
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      console.log('User Authenticated');
      return true;
    }
    this.authService.startAuthentication();
    return false;
  }
}