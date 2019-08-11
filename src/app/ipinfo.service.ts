import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { IP } from './ip';
import { catchError, map } from "rxjs/operators";

@Injectable()
export class IpinfoService {


  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*'
  });

  options = {
    headers: this.httpHeaders
  };

  results: any;

  constructor(private http: HttpClient) { }

  // getIpAddress() {
  //   return this.http
  //     .get('http://freegeoip.net/json/?callback', this.options)
  //     .map(response => response || {})
  //     .catch(this.handleError);
  // }

  getIpAddress(): Observable<IP> {
    return this.http
      .get<IP>("https://freegeoip.net/json/?callback", this.options).pipe(
        map(response => response || {}),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse):
    Observable<any> {
    //Log error in the browser console
    console.error('observable error: ', error);

    return Observable.throw(error);
  }

}
