import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { serviceDetails } from '../../../Interfaces/serviceDetails.interface';
import { UserServiceService } from '../../../Services/user-service.service';

@Component({
  selector: 'app-register-service',
  imports: [FormsModule],
  templateUrl: './register-service.component.html',
  styleUrl: './register-service.component.css',
})
export class RegisterServiceComponent {
  selectedService: serviceDetails | null = null;
  private postService = inject(UserServiceService);
  serviceData: serviceDetails[] = [];
  addService(formValue: serviceDetails) {
    // Get the provider's email from localStorage
    const providerEmail = localStorage.getItem('currUser');
    if (!providerEmail) {
      alert('No provider email found. Please log in again.');
      return;
    }
  
    // Inject providerEmail into formValue before sending
    const newService = {
      ...formValue,
      email: providerEmail,  // Add email to form data
    };
  
    this.postService.postService(newService).subscribe(
      (data: serviceDetails) => {
        console.log('Service added:', data);
        this.serviceData.push(data);
        alert('Service added successfully!');
      },
      (error) => {
        console.error('Failed to add service:', error);
        alert('Failed to add service. Please try again.');
      }
    );
  }
  
}
