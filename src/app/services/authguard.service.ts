import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
    canActivate(): boolean {
      console.log('User Unauthenticated');
      return false;
    }
}