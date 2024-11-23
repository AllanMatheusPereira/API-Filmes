import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FilmesSeriesComponent} from '../filmes/filmes-series/filmes-series.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FilmesSeriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'API-Filmes';
}
