import { Component } from '@angular/core';
import { TranslocoDirective } from '@ngneat/transloco';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TranslocoDirective, ScrollRevealDirective],
  styleUrl: './contact.scss',
  templateUrl: './contact.html',
})
export class ContactComponent {
  public email: string = 'jchernandez9606@gmail.com';
}
