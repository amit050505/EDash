import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) { }

  getEmployees() {
    return this.http.get("https://jsonplaceholder.typicode.com/users");
  }
}
