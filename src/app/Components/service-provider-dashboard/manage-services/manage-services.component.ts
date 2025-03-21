import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../../../Services/user-service.service';
import { serviceDetails } from '../../../Interfaces/serviceDetails.interface';

@Component({
  selector: 'app-manage-services',
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './manage-services.component.html',
  styleUrl: './manage-services.component.css',
})
export class ManageServicesComponent implements OnInit {
  services: serviceDetails[] = [];
  selectedService: serviceDetails | null = null;
  currentProviderEmail: string | null = '';

  constructor(private userService: UserServiceService) {}

  ngOnInit() {
    this.currentProviderEmail = localStorage.getItem('currUser');
    this.loadServices();
  }

  // ✅ Load only the services of the current provider
  loadServices() {
    if (this.currentProviderEmail) {
      this.userService.getServicesByProviderEmail(this.currentProviderEmail)
        .subscribe((data) => this.services = data);
    }
  }

  // ✅ Load data for updating
  loadServiceForUpdate(service: serviceDetails) {
    this.selectedService = { ...service };
  }

  // ✅ Save the updated service
  saveUpdatedService() {
    if (this.selectedService) {
      this.userService.updateService(this.selectedService.id, this.selectedService)
        .subscribe(() => {
          this.selectedService = null;
          this.loadServices();
          alert('Service updated successfully!');
        });
    }
  }

  // ✅ Delete a service
  deleteService(serviceId: number) {
    if (confirm('Are you sure you want to delete this service?')) {
      this.userService.deleteService(serviceId).subscribe(() => {
        this.services = this.services.filter(service => service.id !== serviceId);
        alert('Service deleted successfully!');
      });
    }
  }

  // ✅ Cancel update
  cancelUpdate() {
    this.selectedService = null;
  }
}
