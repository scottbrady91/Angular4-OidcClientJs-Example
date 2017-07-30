import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.completeAuthentication();
    this.router.navigate(["/"]);
  }
}