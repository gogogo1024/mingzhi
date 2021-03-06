import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateCatDto {
  @ApiProperty({ description: 'the name of the cat' })
  @IsString()
  readonly name: string;
  @ApiProperty()
  @IsInt()
  readonly age: number;
  @ApiProperty()
  @IsString()
  readonly breed: string;
  @IsString({ each: true })
  readonly flavors: string[];
  @IsOptional()
  readonly recommendations: number;
}
