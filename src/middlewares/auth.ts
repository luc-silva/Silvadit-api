import { Injectable } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class AuthMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
