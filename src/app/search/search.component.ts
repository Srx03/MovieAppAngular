import { Component, OnInit } from '@angular/core';
import { RootResponse } from '../interface/RootResponse.interface';
import { MovieService } from '../service/movie.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ActorResponse } from '../interface/actor-response';



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
  searchedResponseActor: ActorResponse;

  searchQueryEmpty: boolean = true;
  
  trendingMovie: RootResponse;
  trendingTv: RootResponse;
  trendingActor: ActorResponse;
  presentingSearch: string = "Presenting Trending";
  movieTab: boolean = true;
  tvTab: boolean = false;
  actorTab: boolean = false;

  imgRoot: string = "https://image.tmdb.org/t/p/w500/";

  constructor(private movieService: MovieService,  private toast: HotToastService) { }

  ngOnInit(): void {

  this.trendingMovies();
  this.trendingTvs();
  this.trendingActors();
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
    this.onSearchedTextChanged()
  }


  onSearchedTextChanged(){
    if(this.searchQuery.length > 0){

      if(this.movieTab){
        this.searchedMovies();
      }

      if(this.tvTab){
        this.searchedTvs();
      }

      if(this.actorTab){
        this.searchedActors();
      }
    
    }else{
      this.emptySearchQuery()
      if(this.movieTab){
        this.trendingMovies();
      }

      if(this.tvTab){
        this.trendingTvs();
      }

      if(this.actorTab){
        this.trendingActors();
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

  trendingActors(){
    this.movieService.getTrendingActor().subscribe(
    res =>{
     
        this.trendingActor = res;      
    },
    (error: any)  =>{
      this.toast.error(error.name);
 
     }
 
  )
  }


  searchedMovies(){
    
    this.searchQueryEmpty = false;
    this.presentingSearch = "Presenting Your Search";
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
    this.presentingSearch = "Presenting Your Search";
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

  searchedActors(){
    
    this.searchQueryEmpty = false;
    this.presentingSearch = "Presenting Your Search";
    this.movieService.getSearchedActors(this.searchQuery).subscribe(
      res => {
        console.log("Respone ACTOR is",res)
        if(res.results.length === 0){
          this.notFound = true; 
        }
        else{
          this.notFound = false;
          this.searchedResponseActor = res;
        }
    },
    
    (error: any)  =>{
      this.toast.error(error.name);

    }

    )
  }


  emptySearchQuery(){
    this.presentingSearch = "Presenting Trending";
    this.searchQueryEmpty = true;
    this.notFound = false;
  }


  }





