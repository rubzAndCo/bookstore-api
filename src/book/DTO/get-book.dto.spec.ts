import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from '../../Entity/Book';
import { Repository } from 'typeorm/index';
import { GetBookDto } from './get-book.dto';

describe('GetBookDto', () => {
  let service: GetBookDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetBookDto,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<GetBookDto>(GetBookDto);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return an empty array if book was not found', () => {
    const books: Book[] = [];
    expect(service.format(books)).toStrictEqual([]);
  });

  it('Should return partial information', () => {
    const books: Book[] = [{
      book_id: '1',
      title: 'Book title',
      authors: [],
      description: 'Livre Kamit',
    }];

    expect(service.format(books)).toEqual([{ book_id: '1', title: 'Book title', description: 'Livre Kamit' }]);
  });

  it('Should return complete information', () => {
    const books: Book[] = [{
      book_id: '1',
      title: 'Book title',
      releaseDate: 1072911600,
      authors: [{
        author_id: '1',
        first_name: 'John',
        last_name: 'Doe',
      }],
      description: 'Livre Kamit',
      price: 18,
      stock: 2,
      nbPage: 192,
      length: 22,
      width: 14.5,
      EAN: 9791095097006,
      weight: 260,
      support: "Grand format",
      distributor: "Ekola",
      frontPage: "https://images.epagine.fr/394/9791069913394_1_75.jpg",
      backPage: "https://images.epagine.fr/394/9791069913394_4_75.jpg"
    }];

    expect(service.format(books)).toEqual([{
      book_id: '1',
      releaseDate: 1072911600,
      title: 'Book title',
      description: 'Livre Kamit',
      authors: [{
        author_id: '1',
        first_name: 'John',
        last_name: 'Doe',
      }],
      covers: {
        frontPage: "https://images.epagine.fr/394/9791069913394_1_75.jpg",
        backPage: "https://images.epagine.fr/394/9791069913394_4_75.jpg",
      },
      price: 18,
      stock: 2,
      details: {
        distributor: "Ekola",
        nbPage: 192,
        length: 22,
        width: 14.5,
        EAN: 9791095097006,
        weight: 260,
        support: "Grand format"
      }
    }]);
  });

  it('Should return return an empty details field', () => {
    const books: Book[] = [{
      book_id: '1',
      title: 'Book title',
      releaseDate: 1072911600,
      authors: [{
        author_id: '1',
        first_name: 'John',
        last_name: 'Doe',
      }],
      description: 'Livre Kamit',
      price: 18,
      stock: 2,
      frontPage: "https://images.epagine.fr/394/9791069913394_1_75.jpg",
      backPage: "https://images.epagine.fr/394/9791069913394_4_75.jpg"
    }];

    expect(service.format(books)).toEqual([{
      book_id: '1',
      releaseDate: 1072911600,
      title: 'Book title',
      description: 'Livre Kamit',
      authors: [{
        author_id: '1',
        first_name: 'John',
        last_name: 'Doe',
      }],
      covers: {
        frontPage: "https://images.epagine.fr/394/9791069913394_1_75.jpg",
        backPage: "https://images.epagine.fr/394/9791069913394_4_75.jpg",
      },
      price: 18,
      stock: 2
    }]);
  })
});
