import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Consistent heading block for page sections.
 * Optional "view all" link on the right; any extra controls (e.g. carousel arrows)
 * can be projected into the actions slot.
 */
@Component({
  selector: 'app-section-header',
  imports: [RouterLink],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeaderComponent {
  readonly eyebrow = input<string>();
  readonly heading = input.required<string>();
  readonly subtitle = input<string>();
  readonly linkLabel = input<string>();
  readonly link = input<string>();
}
