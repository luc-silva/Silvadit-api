import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { parseSessionToken, parseToken } from '~/utils/decorators/extract-user';
import { OptionalAuth, Public } from '~/utils/decorators/protect-routes/PublicDecorator';

export class GatekeeperGuard implements CanActivate {
  reflector: Reflector;
  constructor(reflector: Reflector) {
    this.reflector = reflector;
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get(Public, context.getHandler());
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization;

    const isOptional = this.reflector.get(OptionalAuth, context.getHandler());
    if (!isOptional && !token) {
      throw new UnauthorizedException();
    }

    request.session = parseSessionToken(token!) ?? null;
    return true;
  }
}
