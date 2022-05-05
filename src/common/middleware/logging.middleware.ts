import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  // 默认命令行生成 res,res都为any
  use(req: Request, res: Response, next: () => void) {
    console.log(`Hi from middleware`);
    console.time('Request-response time');
    res.on('finish', () => console.timeEnd('Request-response time'));
    next();
  }
}
