import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-features',
  imports: [RouterOutlet, NavbarComponent,FooterComponent],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {
  ngAfterViewInit() {
    // Dynamic background interaction
    const dynamicBg = document.getElementById('dynamicBg');
    if (dynamicBg) {
      dynamicBg.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        dynamicBg.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
      });
    }

    // Card color synchronization
    const cards = document.querySelectorAll('[data-color]');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const color = card.getAttribute('data-color');
        dynamicBg?.classList.add(`hover:bg-gradient-to-br`, `hover:from-${color}-50`, `hover:to-${color}-100`);
      });
      card.addEventListener('mouseleave', () => {
        dynamicBg?.classList.remove(...dynamicBg.classList.toString().split(' ').filter(c => c.startsWith('hover:')));
      });
    });
  }
}
