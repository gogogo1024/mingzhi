import { Injectable } from '@nestjs/common';
import { CatsService } from '../cats/cats.service';

@Injectable()
export class CatRatingService {
  constructor(private readonly catService: CatsService) {}
}
