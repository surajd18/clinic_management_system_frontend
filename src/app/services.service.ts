import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private _http: HttpClient) { }

  submitRegister(body:any){
    return this._http.post('https://clinic-management-backend.azurewebsites.net/api/SignUp', body);
  }
}
