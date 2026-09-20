import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { TranslocoDirective } from '@ngneat/transloco';
import projectsData from '../../../../public/assets/data/projects.json';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  tech: string[];
  liveLink?: string;
  githubLink?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [TranslocoDirective, ScrollRevealDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent implements OnInit, OnDestroy {
  // Lista total de proyectos
  projects = signal<Project[]>([]);

  // Constante para saber cuántos mostrar al inicio
  private readonly INITIAL_COUNT = 2;

  // Estado para la paginación
  visibleCount = signal<number>(this.INITIAL_COUNT);

  // Computed Signal: Recorta la lista automáticamente cuando cambia visibleCount
  visibleProjects = computed(() => this.projects().slice(0, this.visibleCount()));

  // Computed Signal: ¿Quedan más proyectos por mostrar?
  hasMore = computed(() => this.visibleCount() < this.projects().length);

  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;
  private activeSlider: HTMLElement | null = null;
  private autoPlayInterval: any;

  ngOnInit() {
    this.projects.set(projectsData as Project[]);
    this.startAutoPlay();
  }

  ngOnDestroy() {
    if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
  }

  // Despliega todos los proyectos
  showMore() {
    this.visibleCount.set(this.projects().length);
  }

  // Contrae los proyectos y hace scroll suave hacia arriba
  showLess() {
    this.visibleCount.set(this.INITIAL_COUNT);

    // UX Detail: Volver al inicio de la sección para no desorientar al usuario
    const section = document.getElementById('projects');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      const sliders = document.querySelectorAll('.slider-track');
      sliders.forEach((slider) => {
        const el = slider as HTMLElement;
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 5) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: el.clientWidth, behavior: 'smooth' });
        }
      });
    }, 4000);
  }

  startDrag(e: MouseEvent | TouchEvent, slider: HTMLElement) {
    this.isDragging = true;
    this.activeSlider = slider;

    const pageX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
    this.startX = pageX - slider.offsetLeft;
    this.scrollLeft = slider.scrollLeft;
    slider.classList.add('active');
  }

  stopDrag() {
    this.isDragging = false;
    if (this.activeSlider) {
      this.activeSlider.classList.remove('active');
    }
    this.activeSlider = null;
  }

  doDrag(e: MouseEvent | TouchEvent) {
    if (!this.isDragging || !this.activeSlider) return;

    if (e instanceof MouseEvent) {
      e.preventDefault();
    }

    const pageX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
    const x = pageX - this.activeSlider.offsetLeft;
    const walk = (x - this.startX) * 1.5;
    this.activeSlider.scrollLeft = this.scrollLeft - walk;
  }
}
