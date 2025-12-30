import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ExecutionHostMock,
  ReflectorMock,
} from 'test/mock/utils/execution-context';
import { ProtectRoutes } from '~/utils/decorators/protect-routes/PublicDecorator';

describe('ProtectRoutes', () => {
  let executionHostMock: ExecutionHostMock;
  let reflectorMock: ReflectorMock;

  beforeEach(() => {
    reflectorMock = new ReflectorMock();
    executionHostMock = new ExecutionHostMock();
  });

  it('Should create exception if requisition target a non public endpoint', () => {
    const protectedRoute = new ProtectRoutes(reflectorMock);

    reflectorMock.get.mockReturnValue(false);
    const request = {
      headers: {
        authorization: null,
      },
    };

    executionHostMock.switchToHttp().getRequest.mockReturnValue(request);

    expect(() => protectedRoute.canActivate(executionHostMock)).toThrow(
      UnauthorizedException,
    );
  });

  it('Should not create exception if requisition target a public endpoint', () => {
    const protectedRoute = new ProtectRoutes(reflectorMock);

    reflectorMock.get.mockReturnValue(true);
    const request = {
      headers: {
        authorization: null,
      },
    };

    executionHostMock.switchToHttp().getRequest.mockReturnValue(request);

    expect(() => protectedRoute.canActivate(executionHostMock)).not.toThrow(
      UnauthorizedException,
    );
  });


});
