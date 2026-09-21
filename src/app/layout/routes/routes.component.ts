import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar/navbar.component';
import { FooterComponent } from '../footer/footer/footer.component';

@Component({
  selector: 'app-routes',
  imports: [RouterOutlet,NavbarComponent,FooterComponent],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.scss'
})
export class RoutesComponent {
  private readonly _Router = inject(Router);

  private readonly url = toSignal(
    this._Router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects)
    ),
    { initialValue: this._Router.url }
  );

  get showFooter(): boolean {
    return !/^\/auth\/(login|register)/i.test(this.url());
  }
}
