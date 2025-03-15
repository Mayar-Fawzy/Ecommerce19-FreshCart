import { Component } from '@angular/core';
import { NotFoundComponent } from "../../not-found/not-found.component";

@Component({
  selector: 'app-nodata',
  imports: [NotFoundComponent],
  templateUrl: './nodata.component.html',
  styleUrl: './nodata.component.scss'
})
export class NodataComponent {

}
