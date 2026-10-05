import { ChangeDetectionStrategy, Component, input, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselComponent, CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ICategouryIbrands } from '../../../../core/interfaces/ICategouryIbrands';
import { SectionHeaderComponent } from '../../../../Components/SharedComponent/section-header/section-header.component';

@Component({
  selector: 'app-category-showcase',
  imports: [CarouselModule, RouterLink, NgxSkeletonLoaderModule, SectionHeaderComponent],
  templateUrl: './category-showcase.component.html',
  styleUrl: './category-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryShowcaseComponent {
  readonly categories = input<ICategouryIbrands[]>([]);
  readonly loading = input(false);

  private readonly carousel = viewChild(CarouselComponent);

  readonly skeletons = Array.from({ length: 8 });

  prev(): void {
    this.carousel()?.prev();
  }

  next(): void {
    this.carousel()?.next();
  }

  readonly carouselOptions: OwlOptions = {
    loop: true,
    margin: 16,
    dots: false,
    nav: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    smartSpeed: 500,
    responsive: {
      0: { items: 3 },
      576: { items: 4 },
      768: { items: 5 },
      992: { items: 6 },
      1200: { items: 8 },
    },
  };
}
