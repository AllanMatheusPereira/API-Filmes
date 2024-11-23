import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FilmesSeriesModel} from './filmes-series/filmesSeries.model';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {
  private readonly baseUrl = 'http://www.omdbapi.com/';

  private httpClient = inject(HttpClient)

  buscarFilmes(titulo: string): Observable<FilmesSeriesModel> {
    return this.httpClient.get<FilmesSeriesModel>(`${this.baseUrl}?t=${titulo}&apikey=75084d48`);
  }
}
