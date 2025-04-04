import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-not-found',
  imports: [NgIf],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  showAnimation = false;
  showOptions = false;
  hoverState = '';

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.showAnimation = true;
    }, 300);
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  navigateTo(path: string) {
    this.hoverState = path;
    setTimeout(() => {
      this.router.navigate([path]);
    }, 300);
  }
}
