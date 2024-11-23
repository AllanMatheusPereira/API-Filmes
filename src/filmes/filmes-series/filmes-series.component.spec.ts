import { Component } from '@angular/core';
import { FilmesService } from '../filmes.service';
import { FilmesSeriesModel } from './filmesSeries.model';

@Component({
  selector: 'app-filmes-series',
  templateUrl: './filmes-series.component.html',
  styleUrls: ['./filmes-series.component.css'],
})
export class FilmesSeriesComponent {
  titulo: string = '';
  resultado: FilmesSeriesModel[] = [];
  favoritos: FilmesSeriesModel[] = [];
  erro: string = '';
  mostrarFavoritos: boolean = false;

  constructor(private filmesSeries: FilmesService) {
    this.carregarFavoritos();
  }

  public buscarFilmes() {
    this.filmesSeries.buscarFilmes(this.titulo).subscribe({
      next: (res) => {
        if (res && res.Title) {
          this.resultado = [res];
          this.erro = '';
        } else {
          this.resultado = [];
          this.erro = 'Nenhum filme ou série encontrado com esse título.';
        }
      },
      error: (err) => {
        if (err.status === 429) {
          this.erro = 'Você atingiu o limite de requisições diárias. Tente novamente mais tarde.';
        } else {
          this.erro = 'Erro ao buscar os dados. Tente novamente.';
        }
        this.resultado = [];
      },
    });
  }

  toggleFavoritos() {
    this.mostrarFavoritos = !this.mostrarFavoritos;
  }

  public adicionarFavorito(filme: FilmesSeriesModel) {
    if (!this.isFavorito(filme)) {
      this.favoritos.push(filme);
      this.salvarFavoritos();
    }
  }

  public removerFavorito(filme: FilmesSeriesModel) {
    this.favoritos = this.favoritos.filter((fav) => fav.Title !== filme.Title);
    this.salvarFavoritos();
  }

  private salvarFavoritos() {
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }

  private carregarFavoritos() {
    const favoritosSalvos = localStorage.getItem('favoritos');
    if (favoritosSalvos) {
      this.favoritos = JSON.parse(favoritosSalvos);
    }
  }

  public isFavorito(filme: FilmesSeriesModel): boolean {
    return this.favoritos.some((fav) => fav.Title === filme.Title);
  }
}
