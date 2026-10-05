import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { HeroSlide, PromoTile } from '../../../../core/interfaces/home-content';

@Component({
  selector: 'app-home-hero',
  imports: [CarouselModule, RouterLink],
  templateUrl: './home-hero.component.html',
  styleUrl: './home-hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeroComponent {
  readonly slides = input.required<HeroSlide[]>();
  readonly promos = input<PromoTile[]>([]);

  readonly carouselOptions: OwlOptions = {
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 6000,
    autoplayHoverPause: true,
    smartSpeed: 700,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    nav: false,
  };
}
