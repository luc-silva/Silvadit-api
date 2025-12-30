import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JWTEncrypter } from '~/utils/Encrypter';

export const ExtractSession = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    if (request.user) {
      return parseToken(request);
    }
    return null;
  },
);

export const ExtractUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return parseToken(request);
  },
);

export const parseToken = (request: Request) => {
  try {
    const token = request.user!.replace('Bearer', '');
    return JWTEncrypter.decode<ISession>(token.trim());
  } catch (error) {
    throw new UnauthorizedException('Invalid Token');
  }
};
