import { MovieResult } from "./movieResult.interface"

export interface Movie {
    page: number
    results: any[]
    total_pages: number
    total_results: number
  }