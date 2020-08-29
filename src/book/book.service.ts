import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../Entity/Book';
import { DeleteResult, Repository } from 'typeorm/index';
import { CreateBookDto } from './DTO/create-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>
  ) {}

  async create(book: CreateBookDto): Promise<Book> {
    return await this.bookRepository.save(book)
  }

  findAll(): Promise<Book[]> {
    return this.bookRepository.find({ relations: ['authors'] });
  }

  findOne(bookId: string): Promise<Book> {
    return this.bookRepository.findOne(bookId)
  }

  async remove(bookId: string): Promise<DeleteResult> {
    return this.bookRepository.delete(bookId);
  }
}
