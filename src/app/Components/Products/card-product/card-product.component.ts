import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ICardProducts } from '../../../core/interfaces/card-products';
import { ProductCardComponent } from '../product-card/product-card.component';

/** Responsive product grid with an optional skeleton loading state. */
@Component({
  selector: 'app-card-product',
  imports: [ProductCardComponent, NgxSkeletonLoaderModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProductComponent {
  readonly CardProducts = input<ICardProducts[]>([]);
  readonly loading = input(false);
  readonly skeletonCount = input(8);

  readonly skeletons = computed(() => Array.from({ length: this.skeletonCount() }));
}
