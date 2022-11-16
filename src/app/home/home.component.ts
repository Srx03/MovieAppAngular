import { Component, OnInit } from '@angular/core';
import { Movie } from '../interface/movie.interface';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {


    this.movieService.getMovies().subscribe(
      (results: Movie) =>{
        console.log(results);
        console.log(results.results);
      
      
      }
    );

  }

}
