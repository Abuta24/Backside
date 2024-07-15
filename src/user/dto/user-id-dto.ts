import { IsMongoId } from 'class-validator';

export class UserIDValidateDTO {
  @IsMongoId()
  id: string;
}
