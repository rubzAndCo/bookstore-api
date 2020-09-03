import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../Entity/Book';
import { GetBookDto } from './DTO/get-book.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [
    BookService,
    GetBookDto
  ],
  controllers: [BookController]
})
export class BookModule {}
