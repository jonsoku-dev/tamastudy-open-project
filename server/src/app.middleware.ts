import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ServeHTMLMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    // here you can check if the requested path is your api endpoint, if that's the case then we have to return next()
    if (req.path.includes('graphql')) {
      console.log('graphql');
      return next();
    }
    // change the path to the correct html page path in your project
    return next();
    // res.sendFile(join(process.cwd(), 'client', 'index.html'));
  }
}