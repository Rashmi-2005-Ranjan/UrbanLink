import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceDetails } from '../Interfaces/serviceDetails.interface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private url: string = 'http://localhost:3000/services';

  constructor(private http: HttpClient) { }

  // Fetch all services
  getAllServices(selectedLocation: string, selectedService: string): Observable<serviceDetails[]> {
    return this.http.get<serviceDetails[]>(this.url);
  }

  // Fetch services by provider email
  getServicesByProviderEmail(email: string): Observable<serviceDetails[]> {
    return this.http.get<serviceDetails[]>(`${this.url}?email=${email}`);
  }

  // Add new service
  postService(service: serviceDetails): Observable<serviceDetails> {
    return this.http.post<serviceDetails>(this.url, service);
  }

  // Update service
  updateService(serviceId: number, updatedService: serviceDetails): Observable<void> {
    return this.http.put<void>(`${this.url}/${serviceId}`, updatedService);
  }

  // Delete service
  deleteService(serviceId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${serviceId}`);
  }

  sendRequestToProvider(providerEmail: string, currentUserEmail: string): Observable<any> {
    const requestBody = {
      providerEmail: providerEmail,
      requesterEmail: currentUserEmail,
      timestamp: new Date().toISOString()
    };
    return this.http.post('http://localhost:3000/requests', requestBody);
  }

  notifyServiceProvider(request: any): Observable<any> {
    return this.http.post(`${this.url}/requests`, request);
  }
}
