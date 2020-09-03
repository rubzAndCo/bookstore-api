import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm/index';
import { Author } from '../Entity/Author';
import { CreateAuthorDto } from './DTO/create-author.dto';

@Injectable()
export class AuthorService {
  constructor(@InjectRepository(Author) private authorRepository: Repository<Author>) {}

  async create(author: CreateAuthorDto): Promise<Author> {
    return await this.authorRepository.save(author)
  }

  findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  findOne(authorId: string): Promise<Author> {
    return this.authorRepository.findOne(authorId)
  }

  findOneWithBooks(authorId: string): Promise<Author> {
    return this.authorRepository.findOne(authorId, { relations: ['books'] })
  }

  async remove(authorId: string): Promise<DeleteResult> {
    return this.authorRepository.delete(authorId);
  }

  /*async update(author: CreateAuthorDto): Promise<Author> {
    return this.authorRepository.update(author)
  }*/
}
