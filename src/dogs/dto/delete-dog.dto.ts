import { IsString } from 'class-validator';

export class DeleteDogDto {
  @IsString()
  readonly id: string;
}
