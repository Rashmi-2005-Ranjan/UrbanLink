import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceDetails } from '../Interfaces/serviceDetails.interface';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private url: string = 'http://localhost:3000/services';
  private ourl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Fetch all services
  getAllServices(): Observable<serviceDetails[]> {
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
  updateService(
    serviceId: number,
    updatedService: serviceDetails
  ): Observable<void> {
    return this.http.put<void>(`${this.url}/${serviceId}`, updatedService);
  }

  // Delete service
  deleteService(serviceId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${serviceId}`);
  }

  // Send request to provider
  sendRequestToProvider(
    providerEmail: string,
    currentUserEmail: string
  ): Observable<any> {
    const requestBody = {
      providerEmail: providerEmail,
      requesterEmail: currentUserEmail,
      timestamp: new Date().toISOString(),
    };
    return this.http.post(`${this.ourl}/requests`, requestBody);
  }

  // Notify service provider
  notifyServiceProvider(request: any): Observable<any> {
    return this.http.post(`${this.ourl}/requests`, request);
  }

  // Save service request
  saveServiceRequest(requestData: any): Observable<any> {
    return this.http.post(`${this.ourl}/requests`, requestData);
  }

  // Fetch all requests
  getAllRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.ourl}/requests`);
  }

  // Fetch all success services
  getSuccessServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.ourl}/successService`);
  }

  // Accept a request (Move it to successService)
  acceptRequest(request: any) {
    return this.http.post<any>(
      'http://localhost:3000/successService',
      request,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  rejectRequest(request: any): Observable<any> {
    return this.http.post(`${this.ourl}/rejectService`, request);
  }

  // Remove from successService (For unaccepting an accepted request)
  removeFromSuccessServices(requestId: number): Observable<void> {
    return this.http.delete<void>(`${this.ourl}/successService/${requestId}`);
  }

  // Push rejected request to rejectService array
  rejectService(request: any): Observable<any> {
    return this.http.post(`${this.ourl}/rejectService`, request);
  }

  // Load rejected services (if needed)
  getRejectServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.ourl}/rejectService`);
  }
}
