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
    const newService = { formValue };
    this.postService
      .postService(formValue)
      .subscribe((data: serviceDetails) => {
        console.log(data);
        this.serviceData.push(data);
      });
    console.log('Service added:', formValue);
    alert('Service added successfully!');
  }
}
