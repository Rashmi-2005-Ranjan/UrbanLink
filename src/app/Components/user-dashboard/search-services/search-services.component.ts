import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { serviceDetails } from '../../../Interfaces/serviceDetails.interface';
import { UserServiceService } from '../../../Services/user-service.service';
import { NgFor, NgIf } from '@angular/common';

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

  locations: string[] = ['New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Miami'];
  services: string[] = ['Plumbing', 'Electrician', 'House Cleaning', 'Car Repair', 'Tutoring'];

  constructor(private userService: UserServiceService) {}

  // Enable button only when both location and service are selected
  checkSelection() {
    this.isButtonEnabled = !!(this.selectedLocation && this.selectedService);
  }

  getAllService() {
    this.isLoading = true;
    this.searchTriggered = true;

    setTimeout(() => {
      this.userService.getServices(this.selectedLocation, this.selectedService).subscribe((data: serviceDetails[]) => {
        this.userData = data.filter(service =>
          service.location === this.selectedLocation && service.serviceName === this.selectedService
        );
        this.isLoading = false;
      });
    }, 2000); // Simulate network delay
  }
}
