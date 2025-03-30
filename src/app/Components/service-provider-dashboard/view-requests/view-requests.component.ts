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
  loggedInProviderEmail: string = '';
  successService: any[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthServicesService,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    // Get Logged-In Provider Email from AuthService
    this.loggedInProviderEmail = this.authService.getLoggedInUserEmail();

    // Fetch Requests from db.json
    this.http.get<any[]>('http://localhost:3000/requests').subscribe((data) => {
      this.requests = data;
      this.filteredRequests = this.requests.filter((request) => {
        let providerData;
        try {
          providerData =
            typeof request.providerEmail === 'string'
              ? JSON.parse(request.providerEmail)
              : request.providerEmail;
        } catch (error) {
          console.error('Error parsing providerEmail:', error);
          providerData = { email: 'Unknown' }; // Handle invalid JSON
        }
        return providerData.email === this.loggedInProviderEmail;
      });
    });

    this.loadRequests();
    this.loadSuccessServices();
  }

  getUserEmail(userEmail: string): string {
    try {
      return JSON.parse(userEmail).email;
    } catch (error) {
      console.error('Error parsing userEmail:', error);
      return 'Unknown';
    }
  }

  // Load service requests
  loadRequests() {
    this.userService.getAllRequests().subscribe((data) => {
      console.log('📡 Fetching requests from API:', data);
      this.requests = data;

      this.filteredRequests = this.requests.filter((request) => {
        const providerData = JSON.parse(request.providerEmail);
        return providerData.email === this.loggedInProviderEmail;
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

    if (!confirmAccept) return; // Exit if the user cancels

    this.userService.acceptRequest(request).subscribe(
      (response) => {
        console.log('✔ Successfully added to successService:', response);

        // Add the accepted request to successService
        this.successService.push(response);

        // Disable the reject button for this request
        request.isAccepted = true;

        // Reload Success Services to make sure it's updated in the UI
        this.loadSuccessServices();
      },
      (error) => {
        console.error('❌ Error adding to successService:', error);
      }
    );
  }

  // Reject request (default: remove from requests, else remove from successService)
  rejectRequest(requestId: number) {
    // Find the rejected request
    const rejectedRequest = this.requests.find((r) => r.id === requestId);

    if (!rejectedRequest) return;

    // First, add the request to the 'rejectService' array
    this.http
      .post('http://localhost:3000/rejectService', rejectedRequest)
      .subscribe(
        () => {
          console.log('✔ Successfully moved to rejectService');

          // Now, remove it from 'requests'
          this.http
            .delete(`http://localhost:3000/requests/${requestId}`)
            .subscribe(
              () => {
                console.log('🗑 Successfully removed from requests');
                // Update the UI
                this.filteredRequests = this.filteredRequests.filter(
                  (r) => r.id !== requestId
                );
              },
              (error) =>
                console.error('❌ Error removing from requests:', error)
            );
        },
        (error) => console.error('❌ Error adding to rejectService:', error)
      );
  }
}
