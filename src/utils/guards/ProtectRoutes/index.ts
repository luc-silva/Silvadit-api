import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { OptionalAuth, Public } from '~/utils/decorators/protect-routes/PublicDecorator';

export class ProtectRoutes implements CanActivate {
  reflector: Reflector;
  constructor(reflector: Reflector) {
    this.reflector = reflector;
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get(Public, context.getHandler());
    const isOptional = this.reflector.get(OptionalAuth, context.getHandler());

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const auth = request.headers.authorization;

    if (isOptional) {
      request.user = auth ?? null;
      return true;
    }

    if (!auth) {
      throw new UnauthorizedException();
    }

    request.user = auth;
    return true;
  }
}
