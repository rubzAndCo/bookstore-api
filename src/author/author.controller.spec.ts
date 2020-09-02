import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from './author.controller';
import { CreateAuthorDto } from './DTO/create-author.dto';
import { AuthorService } from './author.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import { Author } from '../Entity/Author';

describe('AuthorController', () => {
  let controller: AuthorController;
  let service: AuthorService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          provide: getRepositoryToken(Author),
          useClass: Repository,
        }
      ],
      controllers: [AuthorController],
    }).compile();

    controller = module.get<AuthorController>(AuthorController);
    service = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should call create service with right parameters', async () => {
    const authorDto: CreateAuthorDto = { first_name: 'John', last_name: 'Doe'}
    const serviceMock = jest.spyOn(service, 'create').mockResolvedValueOnce(authorDto)

    await controller.createAuthor(authorDto)

    expect(serviceMock).toBeCalledWith(authorDto)
    expect(serviceMock).toBeCalledTimes(1)
  })

  it('Should call the findAll service with right parameters', async () => {
    const authors: Author[] = [{ first_name: 'John', last_name: 'Doe'}, { first_name: 'Jane', last_name: 'Doe'}]
    const serviceMock = jest.spyOn(service, 'findAll').mockResolvedValueOnce(authors)

    await controller.getAllAuthors()

    expect(serviceMock).toBeCalledTimes(1)
  })

  it('Should call the find service with right parameters', async () => {
    const author: Author = { first_name: 'John', last_name: 'Doe'}
    const id = 'randomId'
    const serviceMock = jest.spyOn(service, 'findOne').mockResolvedValueOnce(author)

    await controller.getOneAuthor(id)

    expect(serviceMock).toBeCalledWith(id)
    expect(serviceMock).toBeCalledTimes(1)
  })

  it('Should call the delete service with right parameters', async () => {
    const id = 'randomId'
    const serviceMock = jest.spyOn(service, 'remove').mockResolvedValueOnce({raw: null})

    await controller.deleteAuthor(id)

    expect(serviceMock).toBeCalledWith(id)
    expect(serviceMock).toBeCalledTimes(1)
  })
});
