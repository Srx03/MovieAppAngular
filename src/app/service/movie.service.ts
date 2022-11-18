import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { RootResponse } from '../interface/RootResponse.interface';
import { MovieResult } from '../interface/MovieResult.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<RootResponse> {
    return this.http.get<RootResponse>('https://api.themoviedb.org/3/movie/popular?api_key=0d78a49b1a3056a1df36e1de7787fcda').pipe(
      map(this.filterMovieResponse)
    )
    }

    getRecentMovies(): Observable<RootResponse> {
      return this.http.get<RootResponse>('https://api.themoviedb.org/3/movie/now_playing?api_key=0d78a49b1a3056a1df36e1de7787fcda').pipe(
        map(this.filterMovieResponse)
      )
      }

      getTopRatedMovies(): Observable<RootResponse> {
        return this.http.get<RootResponse>('https://api.themoviedb.org/3/movie/top_rated?api_key=0d78a49b1a3056a1df36e1de7787fcda').pipe(
          map(this.filterMovieResponse)
        )
      }

      getPopularTv(): Observable<RootResponse> {
        return this.http.get<RootResponse>('https://api.themoviedb.org/3/tv/popular?api_key=0d78a49b1a3056a1df36e1de7787fcda').pipe(
          map(this.filterTvResponse)
        )
        }

        getTopRatedTv(): Observable<RootResponse> {
          return this.http.get<RootResponse>('https://api.themoviedb.org/3/tv/top_rated?api_key=0d78a49b1a3056a1df36e1de7787fcda').pipe(
            map(this.filterTvResponse)
          )
        }

        getSearchedMovies(searchQuery: string): Observable<RootResponse>{
          return this.http.get<RootResponse>(`https://api.themoviedb.org/3/search/movie?api_key=0d78a49b1a3056a1df36e1de7787fcda&query=${searchQuery}`).pipe(
            map(this.filterMovieResponse)
          )
        }

        getTrendingMovies(): Observable<RootResponse> {
          return this.http.get<RootResponse>('https://api.themoviedb.org/3/trending/movie/week?api_key=0d78a49b1a3056a1df36e1de7787fcda').pipe(
            map(this.filterMovieResponse)
          )
          }

        

       

    private filterMovieResponse(response: RootResponse): RootResponse{
      return {
        page: response.page,
        results: response.results.map((movieResult: any) =>(<MovieResult>{
          backdrop_path: movieResult.backdrop_path,
          genre_ids: movieResult.genre_ids,
          id: movieResult.id,
          overview: movieResult.overview,
          poster_path: movieResult.poster_path,
          release_date: movieResult.release_date,
          title: movieResult.title,
          vote_average: movieResult.vote_average

        })),
        total_results: response.total_results,
        total_pages: response.total_pages
      };
  
    
  }

  private filterTvResponse(response: RootResponse): RootResponse{
    return {
      page: response.page,
      results: response.results.map((tvResult: any) =>(<MovieResult>{
        backdrop_path: tvResult.backdrop_path,
        genre_ids: tvResult.genre_ids,
        id: tvResult.id,
        overview: tvResult.overview,
        poster_path: tvResult.poster_path,
        release_date: tvResult.first_air_date,
        title: tvResult.name,
        vote_average: tvResult.vote_average

      })),
      total_results: response.total_results,
      total_pages: response.total_pages
    };

  
}


}