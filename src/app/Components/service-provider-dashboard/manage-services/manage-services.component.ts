import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-services',
  imports: [NgIf,NgFor,FormsModule],
  templateUrl: './manage-services.component.html',
  styleUrl: './manage-services.component.css'
})
export class ManageServicesComponent implements OnInit {
  services: any[] = [];
  selectedService: any = null;
  currentProviderEmail: string | null = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.currentProviderEmail = localStorage.getItem('currUser');
    this.loadServices();
  }

  // Load only the services of the current provider
  loadServices() {
    this.http.get<any[]>('http://localhost:3000/services').subscribe((data) => {
      this.services = data.filter(service => service.email === this.currentProviderEmail);
    });
  }

  // Load data for updating
  loadServiceForUpdate(service: any) {
    this.selectedService = { ...service }; // Create a copy for editing
  }

  // Save the updated service
  saveUpdatedService() {
    this.http.put(`http://localhost:3000/services/${this.selectedService.id}`, this.selectedService)
      .subscribe(() => {
        this.selectedService = null;  // Close the form after saving
        this.loadServices();  // Refresh service list
        alert('Service updated successfully!');
      });
  }

  // Delete a service
  deleteService(serviceId: number) {
    if (confirm('Are you sure you want to delete this service?')) {
      this.http.delete(`http://localhost:3000/services/${serviceId}`).subscribe(() => {
        this.services = this.services.filter(service => service.id !== serviceId);
        alert('Service deleted successfully!');
      });
    }
  }

  // Cancel update
  cancelUpdate() {
    this.selectedService = null;
  }
}