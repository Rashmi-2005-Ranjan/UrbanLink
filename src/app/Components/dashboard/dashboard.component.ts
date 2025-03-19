import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { DashboardContentComponent } from '../dashboard-content/dashboard-content.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule,SideBarComponent,DashboardContentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
