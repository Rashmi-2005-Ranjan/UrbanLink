import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-services',
  imports: [FormsModule],
  templateUrl: './search-services.component.html',
  styleUrl: './search-services.component.css'
})
export class SearchServicesComponent {
selectedLocation: any;
selectedService: any;
  searchServices(){

  }
}
