import { IsInt } from 'class-validator';

export class DeleteCatDto {
  @IsInt()
  readonly id: number;
}
