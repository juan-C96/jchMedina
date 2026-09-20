import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.addClass(this.el.nativeElement, 'reveal-hidden');

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.renderer.addClass(this.el.nativeElement, 'reveal-visible');
              observer.unobserve(this.el.nativeElement);
            }
          });
        },
        { threshold: 0.15 },
      );

      observer.observe(this.el.nativeElement);
    }
  }
}
