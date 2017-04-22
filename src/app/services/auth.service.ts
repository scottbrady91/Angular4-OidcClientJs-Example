import { Injectable } from '@angular/core';

import { UserManager, UserManagerSettings, User } from 'oidc-client';

@Injectable()
export class AuthService {
  private manager = new UserManager(getClientSettings());

  getUser(): User {
      let user: User = null;
      this.manager.getUser().then(result => {
          if (result) user = result;
      });
      return user;
  }

  isLoggedIn(): boolean {
      let isLoggedIn = false;
      this.manager.getUser().then(user => {
          if (user) isLoggedIn = true;
      });
      return isLoggedIn;
  }

  startAuthentication(): void {
      this.manager.signinRedirect();
  }

  completeAuthentication(): void {
      this.manager.signinRedirectCallback();
  }

  getClaims(): any {
      let claims = null;
      this.manager.getUser().then(user => {
          if (user) claims = user.profile;
      });
      return claims;
  }

  getTokenType(): string {
      let scheme = null;
      this.manager.getUser().then(user => {
          if (user) scheme = user.token_type;
      });
      return scheme;
  }

  getAccessToken(): string {
      let token = null;
      this.manager.getUser().then(user => {
          if (user) token = user.access_token;
      });
      return token;
  }
}

export function getClientSettings(): UserManagerSettings {
    return {
        authority: 'http://localhost:5555/',
        client_id: 'angular_spa',
        redirect_uri: 'http://localhost:4200/auth-callback',
        post_logout_redirect_uri: 'http://localhost:4200/',
        response_type:"id_token token",
        scope:"openid profile api1",
        filterProtocolClaims: true,
        loadUserInfo: true
    };
}