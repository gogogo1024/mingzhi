import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDogDto {
  @ApiProperty({ description: 'the name of the cat' })
  @IsString()
  readonly name: string;
  @ApiProperty()
  @IsString()
  readonly type: string;
  @ApiProperty()
  @IsString({ each: true })
  readonly flavors: string[];
}
