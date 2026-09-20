import { Component } from '@angular/core';
import { TranslocoDirective } from '@ngneat/transloco';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

@Component({
  imports: [TranslocoDirective, ScrollRevealDirective],
  selector: 'app-hero',
  styleUrl: './hero.scss',
  templateUrl: './hero.html',
})
export class HeroComponent {}
