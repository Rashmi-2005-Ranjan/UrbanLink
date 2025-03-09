import { Component, OnInit } from '@angular/core';
import { UrbanService } from './services/urban.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [NgFor,FormsModule,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    // Initialization logic here
  }
  location: string = '';
  serviceName: string = '';
  services: any[] = [];

  constructor(private serviceService: UrbanService) {}

  search(): void {
    if (this.location && this.serviceName) {
      this.serviceService.searchService(this.location, this.serviceName).subscribe((data) => {
        this.services = data;
      });
    } else {
      this.services = []; // Hide services if no input is provided
    }
  }
}
