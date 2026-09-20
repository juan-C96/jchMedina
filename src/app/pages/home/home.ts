import { Component, inject } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@ngneat/transloco';
import { AboutComponent } from '../../components/about/about';
import { ContactComponent } from '../../components/contact/contact';
import { HeroComponent } from '../../components/hero/hero';
import { ProjectsComponent } from '../../components/projects/projects';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslocoDirective, HeroComponent, AboutComponent, ProjectsComponent, ContactComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  public translocoService = inject(TranslocoService);
  public isMenuOpen = false;

  switchLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
