import { Component, inject } from '@angular/core';
import { AuthServicesService } from '../../Services/auth-services.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  isSubmitted = false;
  isLoading = false;
  showSuccess = false;
  errorMessage: string | null = null;

  private router = inject(Router);
  private authService = inject(AuthServicesService);

  async onSubmit() {
    if (!this.email) {
      this.errorMessage = 'Please enter your email.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    
    try {
      await this.authService.resetPassword(this.email);
      this.isSubmitted = true;
      this.showSuccess = true;
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        this.showSuccess = false;
      }, 3000);
    } catch (error) {
      this.errorMessage = 'Failed to send reset email. Please try again.';
      console.error('Password reset error:', error);
    } finally {
      this.isLoading = false;
    }
  }
}