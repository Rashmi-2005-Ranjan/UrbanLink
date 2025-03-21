import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceDetails } from '../Interfaces/serviceDetails.interface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }
  
  url: string = 'http://localhost:3000/services';  // Fix URL to point to services

  getServices(location: string, service: string): Observable<serviceDetails[]> {
    let query = `${this.url}?location=${location}&serviceName=${service}`;
    return this.http.get<serviceDetails[]>(query);
  }
}

