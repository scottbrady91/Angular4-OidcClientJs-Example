import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { Observable } from "rxjs/Rx";
import { AuthService } from '../services/auth.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-call-api',
  templateUrl: './call-api.component.html',
  styleUrls: ['./call-api.component.css']
})
export class CallApiComponent implements OnInit {

  constructor(private http: Http, private authService: AuthService) { }

  ngOnInit() {
  }

  callApi(): Observable<string> {
    //let headers = new Headers({ 'Authorization': `${this.authService.getTokenType()} ${this.authService.getAccessToken()}` });
    //let options = new RequestOptions({ headers: headers });
    //console.log(options.headers.get('Authorization'));
    //console.log('Calling API')
    //return this.http.get("http://localhost:5555/api", options)
    //  .map(response => {
    //    console.log('API Responded');
    //    return response.text();
    //  });

    return Observable
      .fromPromise(this.authService.getAuthorizationHeaderValue())
      .flatMap(headerValue => {
        let headers = new Headers({ 'Authorization': headerValue });
        let options = new RequestOptions({ headers: headers });
        console.log(options.headers.get('Authorization'));
        console.log('Calling API');
        
        return this.http.get("http://localhost:5555/api", options)
          .map(response => {
            console.log('API Responded');
            return response.text();
          })
          .catch(error => {
            console.log(error)
            return "uh oh";
          });
      });
  }
}
