import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { serviceDetails } from '../../../Interfaces/serviceDetails.interface';
import { UserServiceService } from '../../../Services/user-service.service';
import { services } from '../../../Data/services';
import { CommonModule } from '@angular/common';
import { locations } from '../../../Data/locations';

@Component({
  selector: 'app-register-service',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register-service.component.html',
  styleUrl: './register-service.component.css',
})
export class RegisterServiceComponent {
  selectedService: serviceDetails | null = null;
  private postService = inject(UserServiceService);
  serviceData: serviceDetails[] = [];
  serviceList = services;

  locationList = locations;
  addService(formValue: serviceDetails) {
    const providerEmail = localStorage.getItem('currUser');

    if (!providerEmail) {
      alert('No provider email found. Please log in again.');
      return;
    }

    const newService: serviceDetails = {
      ...formValue,
      email: providerEmail,
    };

    this.postService.postService(newService).subscribe({
      next: (data: serviceDetails) => {
        console.log('Service added:', data);
        this.serviceData.push(data);
        alert('Service added successfully!');
      },
      error: (error) => {
        console.error('Failed to add service:', error);
        alert('Failed to add service. Please try again.');
      },
    });
  }
}
