import { ActorResults } from "./ActorResults"

export interface ActorResponse {
  page: number
  results: ActorResults[]
  total_pages: number
  total_results: number
}
