import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-call-api',
  templateUrl: './call-api.component.html',
  styles: []
})
export class CallApiComponent implements OnInit {

  response: Object;
  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    let headers = new HttpHeaders({ 'Authorization': this.authService.getAuthorizationHeaderValue() });

    this.http.get<any>("http://localhost:5555/api", { headers: headers })
      .subscribe(response => this.response = response);
  }

}
