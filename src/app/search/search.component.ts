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
  searchedResponse: RootResponse;
  searchQueryEmpty: boolean = true;
  trendingMovie: RootResponse;
  presentingSearch: string = "Presenting Trending Movies";

  imgRoot: string = "https://image.tmdb.org/t/p/w500/";

  constructor(private movieService: MovieService,  private toast: HotToastService) { }

  ngOnInit(): void {
  
  this.trendingMovies();
  }

  onSearchedTextChanged(){
    if(this.searchQuery.length > 0){
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
            this.searchedResponse = res;
          }
      },
      
      (error: any)  =>{
        this.toast.error(error.name);
   
       }
   
      )



    }else{
      this.presentingSearch = "Presenting Trending Movies";
      this.searchQueryEmpty = true;
      this.trendingMovies();
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

  }





