import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './Auth Components/login/login.component';

export const routes: Routes = [
    {path:'',component:SearchComponent},
    {path:'login',component:LoginComponent}
];
