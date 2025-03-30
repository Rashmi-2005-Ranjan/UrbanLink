import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthServicesService } from '../../Services/auth-services.service';
import { UserServiceService } from '../../Services/user-service.service';


@Component({
  selector: 'app-shared',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.css',
})
export class SharedComponent {
  rejectedServices: any[] = [];
  loggedInUserEmail: string = '';
  loggedInUserRole: string = '';

  private authService = inject(AuthServicesService);
  private rejectedService = inject(UserServiceService);

  ngOnInit(): void {
    // Get logged-in user details
    const loggedInUser = this.authService.getCurrentUser();

    if (!loggedInUser) {
      console.error('🚨 No logged-in user found!');
      return;
    }

    this.loggedInUserEmail = loggedInUser.email;
    this.loggedInUserRole = loggedInUser.role;
    console.log('🔐 Logged-in User:', loggedInUser);

    // Fetch rejected services and filter them based on user role
    this.rejectedService.getRejectedServices().subscribe((data) => {
      console.log('📡 Fetching rejected services:', data);
      this.rejectedServices = this.filterRejectedServices(data);
      console.log('✅ Filtered Rejected Services:', this.rejectedServices);
    });
  }

  /** Filters rejected services based on logged-in user role */
  private filterRejectedServices(services: any[]): any[] {
    return services.filter((service) => {
      try {
        const parsedUser = JSON.parse(service.userEmail); // ✅ Parse userEmail
        const parsedProvider = JSON.parse(service.providerEmail); // ✅ Parse providerEmail

        if (this.loggedInUserRole === 'serviceUser') {
          return parsedUser.email === this.loggedInUserEmail;
        }

        if (this.loggedInUserRole === 'serviceProvider') {
          return parsedProvider.email === this.loggedInUserEmail;
        }

        return false;
      } catch (error) {
        console.error('❌ Error parsing userEmail/providerEmail:', error, ' for service:', service);
        return false;
      }
    });
  }
}
