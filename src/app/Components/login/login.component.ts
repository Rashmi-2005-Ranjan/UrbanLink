import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServicesService } from '../../Services/auth-services.service';
import { Router, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,NgIf,RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  private auth = inject(AuthServicesService);
  private router = inject(Router);

  async onSubmit(): Promise<void> {
    const isUser = await this.auth.login(this.email, this.password);
    if (isUser) {
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
