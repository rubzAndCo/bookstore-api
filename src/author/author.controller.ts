import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author } from '../Entity/Author';
import { DeleteResult } from 'typeorm/index';
import { CreateAuthorDto } from './DTO/create-author.dto';

@Controller('author')
export class AuthorController {

  constructor(private authorService: AuthorService) {}

  @Get()
  async getAllAuthors(): Promise<Author[]> {
    return this.authorService.findAll()
  }

  @Get()
  async getOneAuthor(authorId: string): Promise<Author> {
    return this.authorService.findOne(authorId)
  }

  @Post()
  async createAuthor(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorService.create(createAuthorDto)
  }

  @Delete()
  async deleteAuthor(authorId: string): Promise<DeleteResult> {
    return this.authorService.remove(authorId)
  }

  /*@Put()
  async updateAuthor(): Promise<Author> {
    return this.authorService.update()
  }*/

}
