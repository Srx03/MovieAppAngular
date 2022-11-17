import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RootResponse } from '../interface/RootResponse.interface';
import { MovieService } from '../service/movie.service';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchQuery: string;
  notFound: boolean = false;
  searchedResponse: RootResponse;

  imgRoot: string = "https://image.tmdb.org/t/p/w500/";

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    


  }

  onSearchedTextChanged(){
    this.movieService.getSearchedMovies(this.searchQuery).subscribe(
      res => {
        console.log(res)
        if(res.results.length === 0)
        this.notFound = true; 
        else{
          this.notFound = false;
          this.searchedResponse = res;
        }
      }

    )

  }


  }





