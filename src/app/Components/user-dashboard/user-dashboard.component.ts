import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  imports: [SidebarComponent,RouterOutlet],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}
