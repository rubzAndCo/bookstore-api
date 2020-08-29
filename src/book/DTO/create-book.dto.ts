import { Author } from '../../Entity/Author';

export class CreateBookDto {
  title: string;
  description: string
  authors?: Author[];
  releaseDate?: number
  price?: number
  stock?: number
  nbPage?: number
  length?: number
  width?: number
  EAN?: number
  weight?: number
  support?: string
  distributor?: string
  frontPage?: string
  backPage?: string
}