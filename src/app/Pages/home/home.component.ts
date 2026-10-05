import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, Observable } from 'rxjs';
import { ProductsService } from '../../core/Services/products.service';
import { CategoriesService } from '../../core/Services/categories.service';
import { ICardProducts } from '../../core/interfaces/card-products';
import { ICategouryIbrands } from '../../core/interfaces/ICategouryIbrands';
import { CardProductComponent } from '../../Components/Products/card-product/card-product.component';
import { SectionHeaderComponent } from '../../Components/SharedComponent/section-header/section-header.component';
import { HomeHeroComponent } from './components/home-hero/home-hero.component';
import { FeatureHighlightsComponent } from './components/feature-highlights/feature-highlights.component';
import { CategoryShowcaseComponent } from './components/category-showcase/category-showcase.component';
import { PromoBannerComponent } from './components/promo-banner/promo-banner.component';
import { FEATURE_HIGHLIGHTS, HERO_PROMOS, HERO_SLIDES } from './home.content';

const FEATURED_PRODUCTS_LIMIT = 12;
const FEATURED_PRODUCTS_PAGE = 2;

@Component({
  selector: 'app-home',
  imports: [
    HomeHeroComponent,
    FeatureHighlightsComponent,
    CategoryShowcaseComponent,
    SectionHeaderComponent,
    CardProductComponent,
    PromoBannerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly destroyRef = inject(DestroyRef);

  readonly heroSlides = HERO_SLIDES;
  readonly heroPromos = HERO_PROMOS;
  readonly features = FEATURE_HIGHLIGHTS;

  readonly products = signal<ICardProducts[]>([]);
  readonly categories = signal<ICategouryIbrands[]>([]);
  readonly isLoadingProducts = signal(true);
  readonly isLoadingCategories = signal(true);

  ngOnInit(): void {
    this.loadInto(
      this.productsService.getAllProducts(FEATURED_PRODUCTS_LIMIT, FEATURED_PRODUCTS_PAGE),
      this.products,
      this.isLoadingProducts
    );
    this.loadInto(this.categoriesService.getAllCategories(), this.categories, this.isLoadingCategories);
  }

  /** Subscribes to a `{ data }` API response, writing the payload and loading flag into signals. */
  private loadInto<T>(
    source$: Observable<{ data: T }>,
    target: WritableSignal<T>,
    loading: WritableSignal<boolean>
  ): void {
    source$
      .pipe(
        finalize(() => loading.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({ next: (res) => target.set(res.data) });
  }
}
