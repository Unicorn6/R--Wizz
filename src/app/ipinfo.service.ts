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
  responseData: any;
  data: any;
  ipinfo: any = "https://ip-api.com/json";

  constructor(private http: HttpClient) { }

  public async ipInfo() {
    // try {
    const result = await new Promise((resolve, reject) => {
      this.http.get(this.ipinfo).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
    this.responseData = result;
    // console.table(this.responseData);

    // }
    // this.data.postDataX(this.responseData, 'visitors').then((results) => {
    //   this.responseData = results;
    // }, (err) => {
    //   console.log(err);
    // });
    // }
    // catch (err_1) {
    //   console.log(err_1);
    // }

    // var mainContainer = document.getElementById("myData");
    // for (var i = 0; i < this.responseData.length; i++) {
    // var div = document.createElement("div");
    // div.innerHTML = this.responseData.as + ' ' + this.responseData.isp + ' ' + this.responseData.lat + ' ' + this.responseData.lon + ' ' + this.responseData.city + ' ' + this.responseData.country + this.responseData.timezone + ' ' + this.responseData.regionName;
    // mainContainer.appendChild(div);

  }
}