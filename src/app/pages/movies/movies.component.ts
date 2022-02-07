import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from '../../services/movies.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  genreId: string | null = null;
  searchValue: string | null = null;
  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      this.genreId = genreId;
      if (genreId) {
        this.getMoviesByGenreId(genreId, 1); //Day la gia tri genre khoi tao dau tien
      } else {
        this.getPagedMovies(1);
      }
    });
    this.getPagedMovies(1);
  }

  getPagedMovies = (page: number) => {
    this.moviesService.searchMovies(page).subscribe((movies) => {
      this.movies = movies;
    });
  };
  getMoviesByGenreId = (genreId: string, page: number) => {
    return this.moviesService.getMoviesByGenre(genreId, page).subscribe((moviesByGenre) => {
      this.movies = moviesByGenre;
    });
  };

  paginate(event: any) {
    const pageNumber = event.page + 1;
    if (this.genreId) {
      this.getMoviesByGenreId(this.genreId, pageNumber);
    } else {
      this.getPagedMovies(pageNumber);
    }
  }
  searchChanged() {
    console.log('searchChanged', this.searchValue);
  }
}
