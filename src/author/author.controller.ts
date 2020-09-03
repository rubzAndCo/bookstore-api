import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Get(':id')
  async getOneAuthor(@Param() params: {id: string}): Promise<Author> {
    return this.authorService.findOne(params.id)
  }

  @Get(':id/books')
  async getOneAuthorWithBooks(@Param() params: {id: string}): Promise<Author> {
    return this.authorService.findOneWithBooks(params.id)
  }

  @Post()
  async createAuthor(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorService.create(createAuthorDto)
  }

  @Delete(':id')
  async deleteAuthor(@Param() params: {id: string}): Promise<DeleteResult> {
    return this.authorService.remove(params.id)
  }

  /*@Put()
  async updateAuthor(): Promise<Author> {
    return this.authorService.update()
  }*/

}
