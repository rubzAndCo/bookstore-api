import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm/index';
import { Book } from './Book';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  author_id?: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany(type => Book, book => book.authors)
  books?: Book[];

  @Column({
    type: 'varchar',
    nullable: true
  })
  first_name?: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  last_name?: string;
}