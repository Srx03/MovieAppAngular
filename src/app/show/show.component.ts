import { Component, OnInit } from '@angular/core';
import { MoiveDetail } from '../interface/MovieDetail.interface';
import { MovieService } from '../service/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Genre } from '../interface/Genre.interface';
import { MovieCredits } from '../interface/MovieCredits.interface';
import { RootResponse } from '../interface/RootResponse.interface';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  movieId: number;

  movieDetail: MoiveDetail;
  imgRoot: string = "https://image.tmdb.org/t/p/w500/";
  genre: string[];
  movieCredits: MovieCredits;
  similarMovies: RootResponse;
  
  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.params['id'];
    this.getMovieDetail();
    this.getMovieCredits();
    this.getSimilarMovies();
    
  }


  getMovieDetail(){
    this.movieService.getMovieDetail(this.movieId).subscribe(movieDetailResponse => {
      this.movieDetail = movieDetailResponse;
      console.log(movieDetailResponse);
      for(let genreInResponse of movieDetailResponse.genres){
        console.log('this is genre',genreInResponse.name);
        this.genre.push.apply(genreInResponse.name)
      }

      console.log('this is genre',this.genre);

    })
  }
  getMovieCredits(){
    this.movieService.getMovieCredits(this.movieId).subscribe(movieCreditsResponse =>{
        this.movieCredits = movieCreditsResponse
    })
  }

  getSimilarMovies(){
    this.movieService.getSimilarMovies(this.movieId).subscribe(similarMovie =>{
      this.similarMovies = similarMovie;
    })
  }

}
