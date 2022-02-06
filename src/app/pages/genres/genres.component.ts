import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  genres: Genre[] = [];
  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getMovieGenres();
  }

  getMovieGenres = () => {
    this.moviesService.getMoviesGenres().subscribe((genresData) => {
      this.genres = genresData;
    });
  };
}
