import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from '../Entity/Book';
import { Repository } from 'typeorm/index';
import { GetBookDto } from './DTO/get-book.dto';

describe('BookController', () => {
  let controller: BookController;
  let service: BookService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        BookService,
        GetBookDto,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        }
      ]
    }).compile();

    service = module.get<BookService>(BookService);
    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should call the service function (findAll)', async () => {
    const result = [{ book_id: '1', title: 'Rubz Book', authors: [], description: '' }]
    const serviceMock = jest.spyOn(service, 'findAll').mockResolvedValueOnce(result)


    expect(await controller.getBooks()).toEqual([{ book_id: '1', title: 'Rubz Book' }])
    expect(serviceMock.mock.calls.length).toBe(1)
  })

  it('Should call the create service with the right args', async () => {
    const createArgs = { title: 'New Book', description: '', authors: [{ first_name: 'John', last_name: 'Doe' }] }
    const serviceMock = jest.spyOn(service, 'create').mockResolvedValueOnce({ ...createArgs, book_id: '1' })


    expect(await controller.createBook(createArgs)).toStrictEqual({ ...createArgs, book_id: '1' })
    expect(serviceMock).toBeCalledWith(createArgs)
    expect(serviceMock.mock.calls.length).toBe(1)
  })

  it('Should call the delete service with the right args', async () => {
    const deleteArgs = { id: '1' }
    const serviceMock = jest.spyOn(service, 'remove').mockResolvedValueOnce({ raw: null })

    await controller.deleteBook(deleteArgs)

    expect(serviceMock).toBeCalled()
    expect(serviceMock.mock.calls.length).toBe(1)
  })

  it('Should return all fields', async () => {
    const payload = {
      "title": "Woucikam, origine égyptienne de la langue dite créole, décryptage hiéroglyphique de nos us et coutumes t.1",
      "author": "Jean-Luc Divialle",
      "releaseDate": 1526335200,
      "categories": ["Sciences humaines & sociales"],
      "description": "WOUCIKAM tome 1, est une invitation au voyage. L'ouvrage vous entrai^ne, a` travers une enque^te passionnante, sur la piste des origines de notre langue appele´e commune´ment «cre´ole». Ces investigations nous transportent 4500 ans plus to^t, dans la valle´e du Nil, au moyen empire de l'Egypte pharaonique. C'est la`, selon le chercheur, que se situerait les origines re´elles de la langue que nous appelons par simple usage « le cre´ole». L'auteur, par une de´monstration scientifique expose avec pe´dagogie les conclusions de la the`se la plus innovante, jamais pre´sente´e sur les origines de la langue dite cre´ole. Il de´montre alors qu'elle est une authentique langue africaine, bantoue, qui de´sormais inte`gre un lexique franc¸ais. De toute e´vidence, cette langue fut a` son origine, une langue e´crite. Plus, il re´ve`le que notre vocabulaire, au me^me titre que toutes les langues, repose sur des racines qui permettent d'en e´tablir l'e´tymologie. Dans une troisie`me partie toute aussi surprenante, l'auteur interroge les hie´roglyphes e´gyptiens. Il re´ve`le la source e´gyptienne ancienne des us et coutumes des afro-descendants de Guadeloupe. Il restitue leur immense contribution a` l'avenement de notre societé moderne. De l'aveu des spécialistes, Woucikam tome 1, constitue la «bible» de la langue dite créole.",
      "price": 50,
      "stock": 3,
      "nbPage": 552,
      "length": 23,
      "width": 18,
      "EAN": 9791069913394,
      "weight": 972,
      "support": "Grand format",
      "distributor": "Ekola",
      "frontPage": "https://images.epagine.fr/394/9791069913394_1_75.jpg",
      "backPage": "https://images.epagine.fr/394/9791069913394_4_75.jpg"
    }
    const createArgs = { title: 'New Book', description: '', authors: [{ first_name: 'John', last_name: 'Doe' }] }
    const serviceMock = jest.spyOn(service, 'create').mockResolvedValueOnce({ ...createArgs, book_id: '1' })

    await controller.createBook(payload)

    expect(serviceMock).toBeCalledWith(payload)
    expect(serviceMock.mock.calls.length).toBe(1)
  });
})