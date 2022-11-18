import { Genre } from "./Genre.interface"

export interface MoiveDetail {
    backdrop_path: string
    genres: Genre[]
    id: number
    overview: string
    poster_path: string
    release_date: string
    title: string
    vote_average: number

  }