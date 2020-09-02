import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { Book } from 'src/Entity/Book';
import { BookService } from './book.service';
import { CreateBookDto } from './DTO/create-book.dto';
import { DeleteResult } from 'typeorm/index';
import { GetBookDto } from './DTO/get-book.dto';
import { BookDto } from '../Types/BookDto';
import { HttpExceptionFilter } from '../Error/http-exception.filter';
import { QueryExceptionFilter } from '../Error/query-exception.filter';

@Controller('book')
@UseFilters(new HttpExceptionFilter(), new QueryExceptionFilter())
export class BookController {

  constructor(private bookService: BookService, private getBookDto: GetBookDto) {}
  
  @Get()
  @HttpCode(HttpStatus.OK)
  async getBooks(): Promise<BookDto[]> {
    const books = await this.bookService.findAll();

    return this.getBookDto.format(books)
  }

  @Get(':id')
  getOneBook(@Param() params: {id: string}): Promise<Book> {
    return this.bookService.findOne(params.id);
  }

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return await this.bookService.create(createBookDto)
  }

  @Delete(':id')
  async deleteBook(@Param() params: {id: string}): Promise<DeleteResult> {
    return this.bookService.remove(params.id)
  }
}
