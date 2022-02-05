import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMAGES_SIZES } from 'src/app/constants/images-sizes';
import { Movie, MovieCredits, MovieImages, MovieVideo } from '../../models/movie';
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
  movieCredits: MovieCredits | null = null;

  imagesSize = IMAGES_SIZES;
  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}
  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.getMovieById(id);
      this.getMovieVideosById(id);
      this.getMovieImagesById(id);
      this.getMovieCreditsById(id);
    });
  }

  getMovieById = (id: string) => {
    this.moviesService.getMovieById(id).subscribe((movieDetail) => {
      this.movie = movieDetail;
    });
  };

  getMovieVideosById = (id: string) => {
    this.moviesService.getMovieVideos(id).subscribe((videos) => {
      this.movieVideos = videos.splice(0, 3);
    });
  };

  getMovieImagesById = (id: string) => {
    this.moviesService.getMovieImages(id).subscribe((images) => {
      this.movieImages = images;
    });
  };

  getMovieCreditsById = (id: string) => {
    this.moviesService.getMovieCredits(id).subscribe((credits) => {
      this.movieCredits = credits;
      console.log('movieCredits', credits);
    });
  };
}
