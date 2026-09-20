import { Component, inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslocoDirective } from '@ngneat/transloco';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

interface Skill {
  name: string;
  icon: SafeHtml;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslocoDirective, ScrollRevealDirective],
  styleUrl: './about.scss',
  templateUrl: './about.html',
})
export class AboutComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);
  public showMore = false;

  public mainSkills: Skill[] = [];
  public secondarySkills: Skill[] = [];

  private rawMainSkills = [
    {
      name: 'Angular (v17+)',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 5.5l1.6 12.3 8.4 4.2 8.4-4.2L22 5.5 12 2zm0 2.2l7.7 2.7-1.3 9.9-6.4 3.2-6.4-3.2-1.3-9.9L12 4.2zM12 6.5L7.2 17h2.2l1-2.5h3.2l1 2.5h2.2L12 6.5zm0 2.6l1.2 2.8h-2.4L12 9.1z"/></svg>',
    },
    {
      name: 'TypeScript',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.7l-9.3 5.4v10.8l9.3 5.4 9.3-5.4V8.1L12 2.7zm-2.4 12.5h-1.8V10h-2V8.6h5.8V10h-2v5.2zm5.7.2c-1.3 0-2.4-.4-3.2-1.1l.9-1.3c.7.6 1.4.9 2.1.9.9 0 1.2-.4 1.2-.8 0-.6-1.5-.7-2.6-1.3-.9-.4-1.4-1.1-1.4-2 0-1.2.9-2.2 2.9-2.2 1.2 0 2 .3 2.7.7l-.8 1.4c-.6-.4-1.2-.6-1.9-.6-.7 0-1.1.3-1.1.7 0 .5 1.5.7 2.6 1.2 1.1.5 1.5 1.2 1.5 2.1 0 1.4-1.1 2.3-3 2.3z"/></svg>',
    },
    {
      name: 'RxJS & Signals',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.8 6.5c-1.8 0-3 1.3-3.6 2.4-.3.6-.5 1.1-.6 1.5L12 16.5l-2.6-6.1c-.2-.4-.3-.9-.6-1.5-.6-1.1-1.8-2.4-3.6-2.4C2.5 6.5 0 9 0 11.7c0 2.4 1.9 4.3 4.3 4.3 2 0 3.3-1.4 3.9-2.5.3-.6.5-1.1.6-1.5L12 18.5l2.6-6.1c.2-.4.4-.9.6-1.5.6-1.1 1.8-2.5 3.9-2.5 2.4 0 4.3-1.9 4.3-4.3S21.2 6.5 18.8 6.5zm-13.6 8C3.5 14.5 2 13.2 2 11.7S3.5 8.5 5.2 8.5c1 0 1.9.8 2.4 1.7.3.5.4.9.6 1.3l-1.3 3h-1.7zm15.4-2.8c0 1.5-1.5 2.8-3.2 2.8-1 0-1.9-.8-2.4-1.7-.3-.5-.4-.9-.6-1.3l1.3-3h1.7c1.7 0 3.2 1.3 3.2 3.2z"/></svg>',
    },
    {
      name: 'SCSS & Tailwind',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm3.2-12.4c-1.3-1.3-3.4-1.6-5.2-1-.4.1-.5.7-.2.9l1.4 1.4c-.6.3-1.4.2-1.9-.4-.3-.3-.8-.3-1.1 0-.3.3-.3.8 0 1.1 1.1 1.1 2.8 1.4 4.3.7l.8.8c.4.4.9.2 1.1-.2 1-1.6.4-3.5-.8-4.5z"/></svg>',
    },
  ];

  private rawSecondarySkills = [
    {
      name: 'Ionic Framework',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm3.8 14H8.2c-.6 0-1.2-.5-1.2-1.2V9.2c0-.6.5-1.2 1.2-1.2h7.6c.6 0 1.2.5 1.2 1.2v5.6c0 .7-.5 1.2-1.2 1.2zm-3.8-6.5c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5z"/></svg>',
    },
    {
      name: 'PHP & Node.js',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
    },
  ];

  ngOnInit() {
    this.mainSkills = this.rawMainSkills.map((skill) => ({
      name: skill.name,
      icon: this.sanitizer.bypassSecurityTrustHtml(skill.icon),
    }));

    this.secondarySkills = this.rawSecondarySkills.map((skill) => ({
      name: skill.name,
      icon: this.sanitizer.bypassSecurityTrustHtml(skill.icon),
    }));
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }
}
