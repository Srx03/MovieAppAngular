import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Movie } from '../interface/movie.interface';
import { MovieResult } from '../interface/movieResult.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie> {
    return this.http.get<Movie>('https://api.themoviedb.org/3/movie/popular?api_key=0d78a49b1a3056a1df36e1de7787fcda').pipe(
      map(this.filterMovies)
    )




    }

    private filterMovies(movie: Movie): Movie{
      return {
        page: movie.page,
        results: movie.results.map((movieResult: any) =>(<MovieResult>{
          backdrop_path: movieResult.backdrop_path,
          id: movieResult.id,
          overview: movieResult.overview,
          poster_path: movieResult.poster_path,
          release_date: movieResult.release_date,
          title: movieResult.title,
          vote_average: movieResult.vote_average

        })),
        total_results: movie.total_results,
        total_pages: movie.total_pages
      };
  
    
  }


}