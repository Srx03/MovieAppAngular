import { Component, OnInit } from '@angular/core';
import { MoiveDetail } from '../interface/MovieDetail.interface';
import { MovieService } from '../service/movie.service';
import { ActivatedRoute } from '@angular/router';
import { MovieCredits } from '../interface/MovieCredits.interface';
import { RootResponse } from '../interface/RootResponse.interface';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  movieId: number;
  type: string;

  movieDetail: MoiveDetail;
  imgRoot: string = "https://image.tmdb.org/t/p/w500/";
  genre: string[];
  movieCredits: MovieCredits;
  similarMovies: RootResponse;
  isMovie: boolean;
  
  constructor(private movieService: MovieService, private route: ActivatedRoute, private toast: HotToastService) { }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.params['id'];
    this.type = this.route.snapshot.params['type'];
    this.getMovieDetail();
    this.getMovieCredits();
    this.getSimilarMovies();
  }



  getMovieDetail(){
    if( this.type === 'movie'){
      this.movieService.getMovieDetail(this.movieId).subscribe(movieDetailResponse => {
        this.movieDetail = movieDetailResponse;
        console.log(movieDetailResponse);
        for(let genreInResponse of movieDetailResponse.genres){
          console.log('this is genre',genreInResponse.name);
          this.genre.push.apply(genreInResponse.name)
        }
        console.log('this is genre',this.genre);
      },
      (error: any)  =>{
        this.toast.error(error.name);
   
       }
   
      )
    }else{
      this.movieService.getTvDetail(this.movieId).subscribe(movieDetailResponse => {
        this.movieDetail = movieDetailResponse;
        console.log(movieDetailResponse);
        for(let genreInResponse of movieDetailResponse.genres){
          console.log('this is genre',genreInResponse.name);
          this.genre.push.apply(genreInResponse.name)
        }
        console.log('this is genre',this.genre);
      },
      (error: any)  =>{
        this.toast.error(error.name);
   
       }
   
      )
    }
  }

  getMovieCredits(){
    if( this.type === 'movie'){
      this.movieService.getMovieCredits(this.movieId).subscribe(movieCreditsResponse =>{
        this.movieCredits = movieCreditsResponse
      },
      (error: any)  =>{
        this.toast.error(error.name);
   
       }
   
      
      )
    }else{
      this.movieService.getTvCredits(this.movieId).subscribe(movieCreditsResponse =>{
        this.movieCredits = movieCreditsResponse
      },
      (error: any)  =>{
        this.toast.error(error.name);
   
       }
   
      )
    }
 }

  getSimilarMovies(){
    if( this.type === 'movie'){
      this.movieService.getSimilarMovies(this.movieId).subscribe(similarMovie =>{
        this.similarMovies = similarMovie;
      },
      (error: any)  =>{
        this.toast.error(error.name);
   
       }
   
      )
    }else{
      this.movieService.getSimilarTvs(this.movieId).subscribe(similarMovie =>{
        this.similarMovies = similarMovie;
      },
      (error: any)  =>{
        this.toast.error(error.name);
   
       }
   
      )
    }
  }


}




