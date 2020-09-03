import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { CreateBookDto } from '../book/DTO/create-book.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../Entity/Author';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorController],
  providers: [
    AuthorService,
    CreateBookDto
  ]
})
export class AuthorModule {}
