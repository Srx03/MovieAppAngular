import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { RootResponse } from '../interface/RootResponse.interface';
import { MovieResult } from '../interface/MovieResult.interface';
import { MoiveDetail } from '../interface/MovieDetail.interface';
import { MovieCredits } from '../interface/MovieCredits.interface';
import { Cast } from '../interface/Cast.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<RootResponse> {
    return this.http.get<RootResponse>('https://api.themoviedb.org/3/movie/popular?api_key=0d78a49b1a3056a1df36e1de7787fcda').pipe(
      map(this.filterMovieResponse),
      catchError(error => 
         throwError(error)
        
      
        )

    )
    }

    getRecentMovies(): Observable<RootResponse> {
      return this.http.get<RootResponse>('https://api.themoviedb.org/3/movie/now_playing?api_key=0d78a49b1a3056a1df36e1de7787fcda').pipe(
        map(this.filterMovieResponse),
        catchError(error => 
          throwError(error))
      )
      }

      getTopRatedMovies(): Observable<RootResponse> {
        return this.http.get<RootResponse>('https://api.themoviedb.org/3/movie/top_rated?api_key=0d78a49b1a3056a1df36e1de7787fcda').pipe(
          map(this.filterMovieResponse),
          catchError(error => 
            throwError(error))
        )
      }

      getPopularTv(): Observable<RootResponse> {
        return this.http.get<RootResponse>('https://api.themoviedb.org/3/tv/popular?api_key=0d78a49b1a3056a1df36e1de7787fcda').pipe(
          map(this.filterTvResponse),
          catchError(error => 
            throwError(error))
        )
        }

        getTopRatedTv(): Observable<RootResponse> {
          return this.http.get<RootResponse>('https://api.themoviedb.org/3/tv/top_rated?api_key=0d78a49b1a3056a1df36e1de7787fcda').pipe(
            map(this.filterTvResponse),
            catchError(error => 
              throwError(error))
          )
        }

        getSearchedMovies(searchQuery: string): Observable<RootResponse>{
          return this.http.get<RootResponse>(`https://api.themoviedb.org/3/search/movie?api_key=0d78a49b1a3056a1df36e1de7787fcda&query=${searchQuery}`).pipe(
            map(this.filterMovieResponse),
            catchError(error => 
              throwError(error))
          )
        }

        getTrendingMovies(): Observable<RootResponse> {
          return this.http.get<RootResponse>('https://api.themoviedb.org/3/trending/movie/week?api_key=0d78a49b1a3056a1df36e1de7787fcda').pipe(
            map(this.filterMovieResponse),
            catchError(error => 
              throwError(error))
          )
          }

          getMovieDetail(id: number): Observable<MoiveDetail> {
            return this.http.get<MoiveDetail>(`https://api.themoviedb.org/3/movie/${id}?api_key=0d78a49b1a3056a1df36e1de7787fcda`).pipe(
              map(this.filterMovieDetail),
              catchError(error => 
                throwError(error))
            )
            }

            getMovieCredits(id: number): Observable<MovieCredits> {
              return this.http.get<MovieCredits>(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=0d78a49b1a3056a1df36e1de7787fcda`).pipe(
               map(this.filterMovieCredits),
               catchError(error => 
                throwError(error))
              )
              }

              getSimilarMovies(id: number): Observable<RootResponse> {
                return this.http.get<RootResponse>(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=0d78a49b1a3056a1df36e1de7787fcda`).pipe(
                 map(this.filterMovieResponse),
                 catchError(error => 
                  throwError(error))
                )
                }

          
                getTvDetail(id: number): Observable<MoiveDetail> {
                  return this.http.get<MoiveDetail>(`https://api.themoviedb.org/3/tv/${id}?api_key=0d78a49b1a3056a1df36e1de7787fcda`).pipe(
                    map(this.filterTvDetail),
                    catchError(error => 
                      throwError(error))
                  )
                  }
      
                  getTvCredits(id: number): Observable<MovieCredits> {
                    return this.http.get<MovieCredits>(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=0d78a49b1a3056a1df36e1de7787fcda`).pipe(
                     map(this.filterMovieCredits),
                     catchError(error => 
                      throwError(error))
                    )
                    }
      
                    getSimilarTvs(id: number): Observable<RootResponse> {
                      return this.http.get<RootResponse>(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=0d78a49b1a3056a1df36e1de7787fcda`).pipe(
                       map(this.filterTvResponse),
                       catchError(error => 
                        throwError(error))
                      )
                      }

                      getTrendingTv(): Observable<RootResponse> {
                        return this.http.get<RootResponse>('https://api.themoviedb.org/3/trending/tv/week?api_key=0d78a49b1a3056a1df36e1de7787fcda').pipe(
                          map(this.filterTvResponse),
                          catchError(error => 
                            throwError(error))
                        )
                        }

                        getSearchedTvs(searchQuery: string): Observable<RootResponse>{
                          return this.http.get<RootResponse>(`https://api.themoviedb.org/3/search/tv?api_key=0d78a49b1a3056a1df36e1de7787fcda&query=${searchQuery}`).pipe(
                            map(this.filterTvResponse),
                            catchError(error => 
                              throwError(error))
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


private filterMovieDetail(response: MoiveDetail): MoiveDetail{
  return {

    backdrop_path: response.backdrop_path,
    genres: response.genres,
    id: response.id,
    overview: response.overview,
    poster_path: response.poster_path,
    release_date: response.release_date,
    title: response.title,
    vote_average: response.vote_average    
  };


}

private filterTvDetail(response: any): MoiveDetail{
  return {

    backdrop_path: response.backdrop_path,
    genres: response.genres,
    id: response.id,
    overview: response.overview,
    poster_path: response.poster_path,
    release_date: response. first_air_date,
    title: response.name,
    vote_average: response.vote_average    
  };


}

private filterMovieCredits(response: MovieCredits): MovieCredits{
  return {
    id: response.id,
    cast: response.cast.map((cast: any) =>(<Cast>{
      id: cast.id,
      name: cast.name,
      profile_path: cast.profile_path,
      character: cast.character
    }))
    
  };


}




}