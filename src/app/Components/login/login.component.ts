import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/Auth/auth.service';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
email : string='';
password : string='';
errorMessage : string='';

private auth=inject(AuthService);
onSubmit(){
  
}
}
