import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthServicesService } from '../../../Services/auth-services.service';
import { NgFor, NgIf } from '@angular/common';
import { UserServiceService } from '../../../Services/user-service.service';

@Component({
  selector: 'app-view-requests',
  imports: [NgFor, NgIf],
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
          providerData = typeof request.providerEmail === 'string'
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
      console.log("📡 Fetching requests from API:", data);
      this.requests = data;
  
      this.filteredRequests = this.requests.filter((request) => {
        const providerData = JSON.parse(request.providerEmail);
        return providerData.email === this.loggedInProviderEmail;
      });
  
      console.log("✅ Filtered Requests:", this.filteredRequests);
    });
  }
  

  // Load accepted success services
  loadSuccessServices() {
    this.userService.getSuccessServices().subscribe((data) => {
      console.log("🔄 Fetching successService from API:", data);
      this.successService = [...data]; // Ensure Angular detects changes
    });
  }
  
  

  // Accept request -> Move to successService & Remove from requests
  acceptRequest(request: any) {
    this.userService.acceptRequest(request).subscribe(
      (response) => {
        console.log("✔ Successfully added to successService:", response);
        
        // Manually push the accepted request to successService array
        this.successService.push(response); 

        // Reload Success Services to make sure it's updated in the UI
        this.loadSuccessServices(); 
      },
      (error) => {
        console.error("❌ Error adding to successService:", error);
      }
    );
}

  
  
  

  // Reject request (default: remove from requests, else remove from successService)
  rejectRequest(requestId: number, removeFromRequests: boolean = true) {
    const serviceToCall = removeFromRequests
      ? this.userService.rejectRequest(requestId)
      : this.userService.removeFromSuccessServices(requestId);

    serviceToCall.subscribe(() => {
      if (removeFromRequests) {
        this.filteredRequests = this.filteredRequests.filter(
          (r) => r.id !== requestId
        );
      } else {
        this.loadSuccessServices(); // Refetch successService after removal
      }
    });
  }
}
