import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMAGES_SIZES } from 'src/app/constants/images-sizes';
import { Movie, MovieImages, MovieVideo } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movie: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  imagesSize = IMAGES_SIZES;
  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}
  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.getMovieById(id);
      this.getMovieVideosById(id);
      this.getMovieImagesById(id);
    });
  }

  getMovieById = (id: string) => {
    this.moviesService.getMovieById(id).subscribe((movieDetail) => {
      this.movie = movieDetail;
    });
  };

  getMovieVideosById = (id: string) => {
    this.moviesService.getMovieVideos(id).subscribe((videos) => {
      this.movieVideos = videos;
      console.log('this.movieVideos', this.movieVideos);
    });
  };

  getMovieImagesById = (id: string) => {
    this.moviesService.getMovieImages(id).subscribe((images) => {
      this.movieImages = images;
    });
  };
}
