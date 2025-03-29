import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { serviceDetails } from '../../../Interfaces/serviceDetails.interface';
import { UserServiceService } from '../../../Services/user-service.service';
import { NgFor, NgIf } from '@angular/common';
import { locations } from '../../../Data/locations';
import { services } from '../../../Data/services';

@Component({
  selector: 'app-search-services',
  imports: [FormsModule, NgFor,NgIf],
  templateUrl: './search-services.component.html',
  styleUrl: './search-services.component.css'
})
export class ServiceSearchComponent {
  selectedLocation: string = '';
  selectedService: string = '';
  userData: serviceDetails[] = [];
  isLoading: boolean = false;
  searchTriggered: boolean = false;
  isButtonEnabled: boolean = false;

  locations=locations;
  services=services;

  constructor(private userService: UserServiceService) {}

  // Enable button only when both location and service are selected
  checkSelection() {
    this.isButtonEnabled = !!(this.selectedLocation && this.selectedService);
  }

  getAllService() {
    if (!this.selectedLocation || !this.selectedService) {
      alert('Please select both location and service before searching.');
      return;
    }
  
    this.isLoading = true;
    this.searchTriggered = true;
  
    this.userService.getAllServices().subscribe(
      (data) => {
        // Filter services based on selected location and service
        this.userData = data.filter(service =>
          service.location.toLowerCase() === this.selectedLocation.toLowerCase() &&
          service.serviceName.toLowerCase() === this.selectedService.toLowerCase()
        );
  
        this.isLoading = false;
  
        if (this.userData.length === 0) {
          alert('No services found for the selected location and service.');
        }
      },
      (error) => {
        console.error('Error fetching services:', error);
        this.isLoading = false;
      }
    );
  }
  
  callServiceProvider(service: serviceDetails) {
    const currentUserEmail = localStorage.getItem('currUser'); // Get logged-in user's email
  
    if (!currentUserEmail) {
      alert('You need to log in first!');
      return;
    }
  
    // Create request object
    const requestData = {
      userEmail: currentUserEmail,  // The user requesting the service
      serviceName: service.serviceName,
      providerEmail: service.email,
      providerName: service.serviceProviderName,
      location: service.location
    };
  
    // Send request data to the backend (db.json)
    this.userService.saveServiceRequest(requestData).subscribe(
      () => {
        alert(`Service request sent successfully to ${service.serviceProviderName}`);
      },
      (error) => {
        console.error('Error saving service request:', error);
        alert('Failed to send service request. Try again.');
      }
    );
  }
  
  
  
}
