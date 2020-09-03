import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { Book } from './Entity/Book';
import { Author } from './Entity/Author';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      synchronize: true,
      database: process.env.NODE_ENV === 'test' ? './db/test_e2e.sqlite' : './db/books.sqlite',
      entities: [Book, Author]
    }),
    BookModule,
    AuthorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
