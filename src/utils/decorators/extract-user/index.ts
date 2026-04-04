import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserRepository } from '~/api/user/repository/user.repository';
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

export const parseToken = (request: Request) => {
  try {
    const token = request.user!.replace('Bearer', '');
    return JWTEncrypter.decode<ISession>(token.trim());
  } catch (error) {
    throw new UnauthorizedException('Invalid Token');
  }
};

export const ExtractUser = createParamDecorator(
  async (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const session = parseToken(request);

    const userRepository = new UserRepository();
    const userFound = await userRepository.getUserByIdOrUsername(session.id);

    if (!userFound) {
      throw new Error('User not found.');
    }

    return { user: userFound, session };
  },
);

export const parseSessionToken = (token: string) => {
  try {
    const session = token.replace('Bearer', '');
    return JWTEncrypter.decode<ISession>(session.trim());
  } catch (error) {
    throw new UnauthorizedException('Invalid Token');
  }
};