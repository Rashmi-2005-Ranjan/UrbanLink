import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthServicesService } from '../../../Services/auth-services.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { UserServiceService } from '../../../Services/user-service.service';

@Component({
  selector: 'app-view-requests',
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './view-requests.component.html',
  styleUrl: './view-requests.component.css',
})
export class ViewRequestsComponent {
  requests: any[] = [];
  filteredRequests: any[] = [];
  loggedInProviderEmail: string | null = null;
  successService: any[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthServicesService,
    private userService: UserServiceService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.loggedInProviderEmail = await this.authService.getLoggedInUserEmail();
      console.log('🔐 Logged-in Provider Email:', this.loggedInProviderEmail);

      if (!this.loggedInProviderEmail) {
        console.error('🚨 No logged-in provider email found!');
        return;
      }

      this.loadRequests();
      this.loadSuccessServices();
    } catch (error) {
      console.error('🚨 Error retrieving logged-in provider email:', error);
    }
  }

  getUserEmail(userEmail: string): string {
    try {
      return JSON.parse(userEmail).email;
    } catch (error) {
      console.error('❌ Error parsing userEmail:', error);
      return 'Unknown';
    }
  }

  // Load service requests
  loadRequests() {
    this.userService.getAllRequests().subscribe((data) => {
      console.log('📡 Fetching requests from API:', data);
      this.requests = data;
      this.filteredRequests = this.requests.filter((request) => {
        try {
          const providerData = JSON.parse(request.providerEmail);
          return providerData.email === this.loggedInProviderEmail;
        } catch (error) {
          console.error('❌ Error parsing providerEmail:', error);
          return false;
        }
      });
      console.log('✅ Filtered Requests:', this.filteredRequests);
    });
  }

  // Load accepted success services
  loadSuccessServices() {
    this.userService.getSuccessServices().subscribe((data) => {
      console.log('🔄 Fetching successService from API:', data);
      this.successService = [...data]; // Ensure Angular detects changes
    });
  }

  // Accept request -> Move to successService & Remove from requests
  acceptRequest(request: any) {
    const confirmAccept = window.confirm(
      "⚠️ Once you accept this request, it can't be rejected. Do you want to proceed?"
    );

    if (!confirmAccept) return;

    this.userService.acceptRequest(request).subscribe(
      (response) => {
        console.log('✔ Successfully added to successService:', response);
        this.successService.push(response);
        request.isAccepted = true;
        this.loadSuccessServices();
      },
      (error) => {
        console.error('❌ Error adding to successService:', error);
      }
    );
  }

  // Reject request (default: remove from requests, else remove from successService)
  rejectRequest(requestId: number) {
    const rejectedRequest = this.requests.find((r) => r.id === requestId);
    if (!rejectedRequest) return;

    this.http.post('http://localhost:3000/rejectService', rejectedRequest).subscribe(
      () => {
        console.log('✔ Successfully moved to rejectService');
        this.http.delete(`http://localhost:3000/requests/${requestId}`).subscribe(
          () => {
            console.log('🗑 Successfully removed from requests');
            this.filteredRequests = this.filteredRequests.filter((r) => r.id !== requestId);
          },
          (error) => console.error('❌ Error removing from requests:', error)
        );
      },
      (error) => console.error('❌ Error adding to rejectService:', error)
    );
  }
}