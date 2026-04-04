import {
  CallHandler,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { UserRepositoryBase } from '~/api/user/repository/user.repository.base';
import { USER_REPOSITORY_TOKEN } from '~/api/user/repository/user.repository.token';

@Injectable()
export class UserHydrationInteceptor implements NestInterceptor {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepositoryBase,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<Request>();
    request.userData = null;

    const session = request.session;
    if (!session) {
      return next.handle();
    }

    const user = await this.userRepository.getUserByIdOrUsername(session.id);

    request.userData = user;
    return next.handle();
  }
}
