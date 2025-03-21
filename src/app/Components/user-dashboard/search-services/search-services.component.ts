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
    this.isLoading = true;
    this.userService.getAllServices(this.selectedLocation, this.selectedService).subscribe(
      (data) => {
        this.userData = data.map(service => ({
          ...service,
          email: JSON.parse(service.email || '{}')
        }));
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching services:', error);
        this.isLoading = false;
      }
    );
  }
  callServiceProvider(providerEmail: string) {
    const currentUserEmail = localStorage.getItem('currUser');  // Get current user's email
    if (!currentUserEmail) {
      alert('You need to log in first!');
      return;
    }
  
    console.log(`Request sent from ${currentUserEmail} to ${providerEmail}`);
    alert(`Request sent to service provider at ${providerEmail}`);
  }
  
  
  
}
