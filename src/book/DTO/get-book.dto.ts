import { Book } from '../../Entity/Book';
import { Injectable } from '@nestjs/common';
import { BookDto } from '../../Types/BookDto';
import { BookAuthor, RawBookAuthor } from '../../Types/BookAuthor';
import { BookDetails } from '../../Types/BookDetails';
import { BookCovers, RawBookCovers } from '../../Types/BookCovers';


@Injectable()
export class GetBookDto {
  format(books: Book[]): BookDto[] {
    return books.map(book => {
      return {
        book_id: book.book_id || undefined,
        title: book.title || undefined,
        authors: this.formatAuthors(book.authors),
        releaseDate: book.releaseDate || undefined,
        description: book.description || undefined,
        price: book.price || undefined,
        stock: book.stock || undefined,
        details: this.formatDetail(book),
        covers: this.formatCover({frontPage: book.frontPage, backPage: book.backPage})
      }
    })
  }

  private formatAuthors(rawAuthors: RawBookAuthor[]): BookAuthor[] | undefined {
    if (!rawAuthors || !Array.isArray(rawAuthors) || rawAuthors.length === 0) return undefined
    return rawAuthors.map(author => {
      return author || undefined
    })
  }

  private formatDetail(book: Book): BookDetails | undefined {
    if (!book.nbPage && !book.length && !book.weight && !book.EAN && !book.weight && !book.support && !book.distributor) return undefined

    return {
      nbPage: book.nbPage || undefined,
      length: book.length || undefined,
      width: book.width || undefined,
      EAN: book.EAN || undefined,
      weight: book.weight || undefined,
      support: book.support || undefined,
      distributor: book.distributor || undefined
    }
  }

  private formatCover(rawCover: RawBookCovers): BookCovers | undefined {
    if (!rawCover.frontPage && !rawCover.backPage) return undefined
    return {
      frontPage: rawCover.frontPage || undefined,
      backPage: rawCover.backPage || undefined
    }
  }
}