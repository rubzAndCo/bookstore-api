import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm/index';
import { Book } from './Book';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  author_id?: string;

  @ManyToMany(type => Book, book => book.authors)
  @JoinTable()
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