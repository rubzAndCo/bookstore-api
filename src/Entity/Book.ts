import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm/index';
import { Author } from './Author';

@Entity()
export class Book {

  @PrimaryGeneratedColumn('uuid')
  book_id: string;

  @ManyToMany(type => Author, author => author.books)
  @JoinTable()
  authors: Author[];

  @Column({
    type: 'varchar'
  })
  title: string;

  @Column({
    type: 'varchar'
  })
  description: string;

  @Column({
    type: 'int',
    nullable: true
  })
  releaseDate?: number | null;

  @Column({
    type: 'int',
    nullable: true
  })
  price?: number | null;

  @Column({
    type: 'int',
    nullable: true
  })
  stock?: number | null;

  @Column({
    type: 'int',
    nullable: true
  })
  nbPage?: number | null;

  @Column({
    type: 'int',
    nullable: true
  })
  length?: number | null;

  @Column({
    type: 'int',
    nullable: true
  })
  width?: number | null

  @Column({
    type: 'int',
    nullable: true
  })
  EAN?: number | null

  @Column({
    type: 'int',
    nullable: true
  })
  weight?: number | null;

  @Column({
    type: 'varchar',
    nullable: true
  })
  support?: string | null

  @Column({
    type: 'varchar',
    nullable: true
  })
  distributor?: string | null

  @Column({
    type: 'varchar',
    nullable: true
  })
  frontPage?: string | null

  @Column({
    type: 'varchar',
    nullable: true
  })
  backPage?: string | null

}