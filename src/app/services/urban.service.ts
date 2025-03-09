import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrbanService {

  private apiUrl = 'http://localhost:3000/services'; // JSON Server API

  constructor(private http: HttpClient) {}

  // Fetch all services
  getServices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Fetch services based on location and service name
  searchService(location: string, serviceName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?location=${location}&name=${serviceName}`);
  }
  
  }

