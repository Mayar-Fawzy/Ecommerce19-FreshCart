import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FeatureHighlight } from '../../../../core/interfaces/home-content';

@Component({
  selector: 'app-feature-highlights',
  templateUrl: './feature-highlights.component.html',
  styleUrl: './feature-highlights.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureHighlightsComponent {
  readonly features = input.required<FeatureHighlight[]>();
}
