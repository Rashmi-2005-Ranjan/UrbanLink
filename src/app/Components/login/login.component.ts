import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServicesService } from '../../Services/auth-services.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  private auth = inject(AuthServicesService);
  private router = inject(Router);
  onSubmit(): void {
    const isUser = this.auth.login(this.email, this.password);
    if (isUser) {
      this.errorMessage = '';
  
      // Get the current user and redirect based on role
      const user = this.auth.getCurrentUser();
      if (user?.role === 'serviceUser') {
        this.router.navigate(['/user-dashboard']);
      } else if (user?.role === 'serviceProvider') {
        this.router.navigate(['/service-provider-dashboard']);
      }
    } else {
      this.errorMessage = 'Invalid email or password. Please try again.';
    }
  }
  
}
