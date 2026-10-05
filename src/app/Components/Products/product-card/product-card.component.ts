import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ICardProducts } from '../../../core/interfaces/card-products';
import { ProductActionsService } from '../../../core/Services/product-actions.service';
import { StarRatingComponent } from '../../SharedComponent/star-rating/star-rating.component';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink, StarRatingComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  private readonly productActions = inject(ProductActionsService);
  private readonly destroyRef = inject(DestroyRef);

  readonly product = input.required<ICardProducts>();

  readonly isAddingToCart = signal(false);
  readonly isWishlisted = signal(false);

  readonly detailsLink = computed(() => ['/ProductDetailes', this.product()._id]);

  readonly hasDiscount = computed(() => {
    const { price, priceAfterDiscount } = this.product();
    return !!priceAfterDiscount && priceAfterDiscount < price;
  });

  readonly finalPrice = computed(() =>
    this.hasDiscount() ? this.product().priceAfterDiscount! : this.product().price
  );

  readonly discountPercent = computed(() =>
    this.hasDiscount() ? Math.round((1 - this.finalPrice() / this.product().price) * 100) : 0
  );

  addToCart(): void {
    if (this.isAddingToCart()) return;

    this.isAddingToCart.set(true);
    this.productActions
      .addToCart(this.product()._id)
      .pipe(
        finalize(() => this.isAddingToCart.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  addToWishlist(): void {
    if (this.isWishlisted()) return;

    this.productActions
      .addToWishlist(this.product()._id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.isWishlisted.set(true));
  }
}
