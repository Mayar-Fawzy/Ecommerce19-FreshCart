import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CallToAction } from '../../../../core/interfaces/home-content';

@Component({
  selector: 'app-promo-banner',
  imports: [RouterLink],
  templateUrl: './promo-banner.component.html',
  styleUrl: './promo-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoBannerComponent {
  readonly image = input.required<string>();
  readonly eyebrow = input<string>();
  readonly heading = input.required<string>();
  readonly description = input<string>();
  readonly primaryAction = input.required<CallToAction>();
  readonly secondaryAction = input<CallToAction>();
}
