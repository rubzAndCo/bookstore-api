import { BookCovers } from './BookCovers';
import { BookDetails } from './BookDetails';
import { BookAuthor } from './BookAuthor';

export type BookDto = {
  title?: string
  authors?: Array<BookAuthor>
  description?: string
  releaseDate?: number
  price?: number
  stock?: number
  details?: BookDetails
  covers?: BookCovers
}