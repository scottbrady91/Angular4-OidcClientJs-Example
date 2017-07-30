import { Injectable } from '@angular/core';

import { UserManager, UserManagerSettings, User, WebStorageStateStore } from 'oidc-client';

@Injectable()
export class AuthService {
    private manager = new UserManager(getClientSettings());

    getUser(): Promise<User> {
        return this.manager.getUser();
    }

    isLoggedIn(): Promise<boolean> {
        return this.manager.getUser().then(user => {
            if (user) return true;
            else return false;
        });
    }

    startAuthentication(): Promise<void> {
        return this.manager.signinRedirect();
    }

    completeAuthentication(): Promise<User> {
        return this.manager.signinRedirectCallback();
    }

    getClaims(): Promise<any> {
        return this.manager.getUser().then(user => {
            if (user) return user.profile;
        });
    }

    getTokenType(): Promise<string> {
        return this.manager.getUser().then(user => {
            if (user) return user.token_type;
        });
    }

    getAccessToken(): Promise<string> {
        return this.manager.getUser().then(user => {
            if (user) return user.access_token;
        });
    }

    getAuthorizationHeaderValue(): Promise<string> {
        return this.manager.getUser().then(user => {
            if (user) return `${user.token_type} ${user.access_token}`;
        });
    }
}

export function getClientSettings(): UserManagerSettings {
    return {
        authority: 'http://localhost:5555/',
        client_id: 'angular_spa',
        redirect_uri: 'http://localhost:4200/auth-callback',
        post_logout_redirect_uri: 'http://localhost:4200/',
        response_type: "id_token token",
        scope: "openid profile api1",
        filterProtocolClaims: true,
        loadUserInfo: true,
        userStore: new WebStorageStateStore({ store: window.localStorage })
    };
}