import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/Auth/auth.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
email : string='';
password : string='';
errorMessage : string='';

private auth=inject(AuthService);
onSubmit():void{
  const isUser=this.auth.login(this.email,this.password);
  if(isUser){
    this.errorMessage='';

    //Navigate To Dashboard
    this.auth.navigateByUrl('/dashboard');
   

  }else{
    this.errorMessage = 'Invalid Credentials';
  }
}
}
