import { Component, OnInit } from '@angular/core';
import { RootResponse } from '../interface/RootResponse.interface';
import { MovieService } from '../service/movie.service';
import { HotToastService } from '@ngneat/hot-toast';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchQuery: string;
  notFound: boolean = false;
  searchedResponseMovie: RootResponse;
  searchedResponseTv: RootResponse;
  searchedResponseActor: RootResponse;
  searchQueryEmpty: boolean = true;
  trendingMovie: RootResponse;
  trendingTv: RootResponse;
  presentingSearch: string = "Presenting Trending Movies";
  movieTab: boolean = true;
  tvTab: boolean = false;
  actorTab: boolean = false;

  imgRoot: string = "https://image.tmdb.org/t/p/w500/";

  constructor(private movieService: MovieService,  private toast: HotToastService) { }

  ngOnInit(): void {

  this.trendingMovies();
  this.trendingTvs();
  this.onMovieTabClick();
  }

  onMovieTabClick(){

    this.movieTab = true;
    this.tvTab = false;
    this.actorTab = false;
    this.onSearchedTextChanged()
  }


  onTvTabClick(){

    this.movieTab = false;
    this.tvTab = true;
    this.actorTab = false;
    this.onSearchedTextChanged()
  }

  onActorTabClick(){

    this.movieTab = false;
    this.tvTab = false;
    this.actorTab = true;
  }


  onSearchedTextChanged(){
    if(this.searchQuery.length > 0){

      if(this.movieTab){
        this.searchedMovies();
      }

      if(this.tvTab){
        this.searchedTvs();
      }
    
    }else{
      this.emptySearchQuery()
      if(this.movieTab){
        this.trendingMovies();
      }

      if(this.tvTab){
        this.trendingTvs();
      }
    }

  }

  trendingMovies(){
    this.movieService.getTrendingMovies().subscribe(
    res =>{
        this.trendingMovie = res;      
    },
    (error: any)  =>{
      this.toast.error(error.name);
 
     }
 
  )
  }

  trendingTvs(){
    this.movieService.getTrendingTv().subscribe(
    res =>{
        this.trendingTv = res;      
    },
    (error: any)  =>{
      this.toast.error(error.name);
 
     }
 
  )
  }


  searchedMovies(){
    
    this.searchQueryEmpty = false;
    this.presentingSearch = "Presenting You Search";
    this.movieService.getSearchedMovies(this.searchQuery).subscribe(
      res => {
        console.log("Respone is",res)
        if(res.results.length === 0){
          this.notFound = true; 
        }
        else{
          this.notFound = false;
          this.searchedResponseMovie = res;
        }
    },
    
    (error: any)  =>{
      this.toast.error(error.name);

    }

    )
  }


  searchedTvs(){
    
    this.searchQueryEmpty = false;
    this.presentingSearch = "Presenting You Search";
    this.movieService.getSearchedTvs(this.searchQuery).subscribe(
      res => {
        console.log("Respone is",res)
        if(res.results.length === 0){
          this.notFound = true; 
        }
        else{
          this.notFound = false;
          this.searchedResponseTv = res;
        }
    },
    
    (error: any)  =>{
      this.toast.error(error.name);

    }

    )
  }

  emptySearchQuery(){
    this.presentingSearch = "Presenting Trending Movies";
    this.searchQueryEmpty = true;
    this.notFound = false;
  }


  }





