import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthServicesService } from '../../../Services/auth-services.service';
import { UserServiceService } from '../../../Services/user-service.service';

@Component({
  selector: 'app-show-status',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './show-status.component.html',
  styleUrl: './show-status.component.css',
})
export class ShowStatusComponent {
  successServices: any[] = [];
  loggedInUserEmail: string = '';

  private authService = inject(AuthServicesService);
  private successService = inject(UserServiceService);

  ngOnInit(): void {
    // Get the logged-in user email
    this.loggedInUserEmail = this.authService.getaLoggedInUserEmail();
    console.log('🔐 Logged-in User Email:', this.loggedInUserEmail);

    if (!this.loggedInUserEmail) {
      console.error('🚨 No logged-in user email found!');
      return;
    }

    // Fetch success services from API
    this.successService.getSuccessServices().subscribe((data) => {
      console.log('📡 Fetching success services:', data);

      // Filter services for the currently logged-in user
      this.successServices = data.filter((service) => {
        try {
          const parsedUser = JSON.parse(service.userEmail); // ✅ Parse stored userEmail
          console.log('🔍 Parsed User Data:', parsedUser);

          return parsedUser.email === this.loggedInUserEmail;
        } catch (error) {
          console.error(
            '❌ Error parsing userEmail:',
            error,
            ' for service:',
            service
          );
          return false;
        }
      });

      console.log('✅ Filtered Success Services:', this.successServices);
    });
  }
}
