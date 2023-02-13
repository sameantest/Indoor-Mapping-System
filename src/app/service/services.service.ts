import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private _http: HttpClient) { }

  adminLogin(admin:any): Observable<string> {
    return this._http.post("http://localhost:3000/adminReg", admin, {responseType: 'text'});
  }
}
