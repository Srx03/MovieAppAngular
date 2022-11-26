import { Component, OnInit } from '@angular/core';
import { RootResponse } from '../interface/RootResponse.interface';
import { MovieService } from '../service/movie.service';
import { HotToastService } from '@ngneat/hot-toast';

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

  constructor(private movieService: MovieService, private toast: HotToastService,) { }

  ngOnInit(): void {

  

    this.movieService.getPopularMovies().subscribe(
      (results: RootResponse) =>{
       this.popularMovieResponse= results;
      },
    (error: any)  =>{
     this.toast.error(error.name);
    }

    );

    this.movieService.getRecentMovies().subscribe(
      (results: RootResponse) =>{
        this.recentMovieResponse= results;
      },
      
      (error: any)  =>{
        this.toast.error(error.name);
   
       }
   
    );

    this.movieService.getTopRatedMovies().subscribe(
      (results: RootResponse) =>{
        this.topRatedMovieResponse= results;
      },
      
      (error: any)  =>{
        this.toast.error(error.name);
   
       }
   
    );

    this.movieService.getPopularTv().subscribe(
      (results: RootResponse) =>{
       this.popularTvResponse= results;
       console.log(results);
      },
      (error: any)  =>{
        this.toast.error(error.name);
   
       }
   
    );

    this.movieService.getTopRatedTv().subscribe(
      (results: RootResponse) =>{
        this.topRatedTvResponse= results;
      },
      (error: any)  =>{
        this.toast.error(error.name);
   
       }
   
    );

  }

}
