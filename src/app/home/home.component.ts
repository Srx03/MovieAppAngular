import { Component, OnInit } from '@angular/core';
import { MoiveDetail } from '../interface/MovieDetail.interface';
import { RootResponse } from '../interface/RootResponse.interface';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  popularMovieResponse: RootResponse;
  recentMovieResponse: RootResponse;
  topRatedMovieResponse: RootResponse;
  popularTvResponse: RootResponse;
  topRatedTvResponse: RootResponse;

  imgRoot: string = "https://image.tmdb.org/t/p/w500/";

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {

    this.movieService.getTvDetail(14564).subscribe(
      (results: MoiveDetail) =>{
        console.log(results);
       }
    )

    this.movieService.getPopularMovies().subscribe(
      (results: RootResponse) =>{
       this.popularMovieResponse= results;
      }
    );

    this.movieService.getRecentMovies().subscribe(
      (results: RootResponse) =>{
        this.recentMovieResponse= results;
      }
    );

    this.movieService.getTopRatedMovies().subscribe(
      (results: RootResponse) =>{
        this.topRatedMovieResponse= results;
      }
    );

    this.movieService.getPopularTv().subscribe(
      (results: RootResponse) =>{
       this.popularTvResponse= results;
       console.log(results);
      }
    );

    this.movieService.getTopRatedTv().subscribe(
      (results: RootResponse) =>{
        this.topRatedTvResponse= results;
      }
    );

  }

}
