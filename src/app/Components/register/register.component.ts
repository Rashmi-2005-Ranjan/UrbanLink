import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServicesService } from '../../Services/auth-services.service';
import { Router, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,NgIf,RouterOutlet],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  role: 'serviceUser' | 'serviceProvider' = 'serviceUser';
  errorMessage: string = '';
  private auth = inject(AuthServicesService);
  private router = inject(Router);

  async onRegister(): Promise<void> {
    try {
      await this.auth.register(this.email, this.password, this.role);
      this.router.navigate(['/login']);
    } catch (error) {
      this.errorMessage = 'Registration failed. Please try again.';
    }
  }
}
