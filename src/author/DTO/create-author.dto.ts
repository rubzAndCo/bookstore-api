import { Entity } from 'typeorm/index';

@Entity()
export class CreateAuthorDto {
  first_name: string
  last_name: string
}