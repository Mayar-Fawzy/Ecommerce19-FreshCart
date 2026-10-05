import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

type StarFill = 'full' | 'half' | 'empty';

const MAX_STARS = 5;

@Component({
  selector: 'app-star-rating',
  imports: [DecimalPipe],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarRatingComponent {
  readonly value = input.required<number>();
  /** Number of reviews; shown next to the score when provided. */
  readonly count = input<number>();

  readonly stars = computed<StarFill[]>(() => {
    // Round to the nearest half so 4.7 → 4.5 stars, 4.8 → 5 stars.
    const rounded = Math.round(this.value() * 2) / 2;
    return Array.from({ length: MAX_STARS }, (_, i) => {
      if (rounded >= i + 1) return 'full';
      if (rounded >= i + 0.5) return 'half';
      return 'empty';
    });
  });
}
