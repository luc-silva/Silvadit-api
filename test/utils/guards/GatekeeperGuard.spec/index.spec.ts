import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { GatekeeperGuard } from '~/utils/guards/GatekeeperGuard';
import { Public, OptionalAuth } from '~/utils/decorators/protect-routes/PublicDecorator';
import * as extractUser from '~/utils/decorators/extract-user';

jest.mock('~/utils/decorators/extract-user');

describe('GatekeeperGuard', () => {
  let guard: GatekeeperGuard;
  let reflector: Reflector;
  let mockContext: jest.Mocked<ExecutionContext>;
  let mockRequest: Partial<Request>;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new GatekeeperGuard(reflector);
    
    mockRequest = {
      headers: {},
      session: undefined,
    } as Partial<Request>;

    mockContext = {
      getHandler: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      }),
    } as unknown as jest.Mocked<ExecutionContext>;

    jest.clearAllMocks();
  });

  describe('canActivate', () => {
    it('should return true when route is marked with @Public()', () => {
      const handler = jest.fn();
      mockContext.getHandler.mockReturnValue(handler);
      
      jest.spyOn(reflector, 'get').mockImplementation((decorator) => {
        if (decorator === Public) return true;
        return false;
      });

      const result = guard.canActivate(mockContext);

      expect(result).toBe(true);
      expect(mockRequest.session).toBeUndefined();
    });

    it('should throw UnauthorizedException when token is missing and route is not optional', () => {
      const handler = jest.fn();
      mockContext.getHandler.mockReturnValue(handler);
      
      jest.spyOn(reflector, 'get').mockImplementation((decorator) => {
        if (decorator === Public) return false;
        if (decorator === OptionalAuth) return false;
        return false;
      });

      expect(() => guard.canActivate(mockContext)).toThrow(UnauthorizedException);
    });

    it('should not throw when token is missing but route is marked with @OptionalAuth()', () => {
      const handler = jest.fn();
      mockContext.getHandler.mockReturnValue(handler);
      
      jest.spyOn(reflector, 'get').mockImplementation((decorator) => {
        if (decorator === Public) return false;
        if (decorator === OptionalAuth) return true;
        return false;
      });

      const result = guard.canActivate(mockContext);

      expect(result).toBe(true);
      expect(mockRequest.session).toBeNull();
    });

    it('should parse session token when token is present', () => {
      const handler = jest.fn();
      const token = 'Bearer valid-token';
      const mockSession = { id: '123', username: 'testuser' };
      
      mockRequest.headers = { authorization: token };
      mockContext.getHandler.mockReturnValue(handler);
      
      jest.spyOn(reflector, 'get').mockImplementation((decorator) => {
        if (decorator === Public) return false;
        if (decorator === OptionalAuth) return false;
        return false;
      });

      (extractUser.parseSessionToken as jest.Mock).mockReturnValue(mockSession);

      const result = guard.canActivate(mockContext);

      expect(result).toBe(true);
      expect(extractUser.parseSessionToken).toHaveBeenCalledWith(token);
      expect(mockRequest.session).toEqual(mockSession);
    });

    it('should set session to null when parseSessionToken returns null', () => {
      const handler = jest.fn();
      const token = 'Bearer valid-token';
      
      mockRequest.headers = { authorization: token };
      mockContext.getHandler.mockReturnValue(handler);
      
      jest.spyOn(reflector, 'get').mockImplementation((decorator) => {
        if (decorator === Public) return false;
        if (decorator === OptionalAuth) return false;
        return false;
      });

      (extractUser.parseSessionToken as jest.Mock).mockReturnValue(null);

      const result = guard.canActivate(mockContext);

      expect(result).toBe(true);
      expect(mockRequest.session).toBeNull();
    });

    it('should throw UnauthorizedException when parseSessionToken throws', () => {
      const handler = jest.fn();
      const token = 'Bearer invalid-token';
      
      mockRequest.headers = { authorization: token };
      mockContext.getHandler.mockReturnValue(handler);
      
      jest.spyOn(reflector, 'get').mockImplementation((decorator) => {
        if (decorator === Public) return false;
        if (decorator === OptionalAuth) return false;
        return false;
      });

      (extractUser.parseSessionToken as jest.Mock).mockImplementation(() => {
        throw new UnauthorizedException('Invalid Token');
      });

      expect(() => guard.canActivate(mockContext)).toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when authorization header is empty string', () => {
      const handler = jest.fn();
      mockRequest.headers = { authorization: '' };
      mockContext.getHandler.mockReturnValue(handler);
      
      jest.spyOn(reflector, 'get').mockImplementation((decorator) => {
        if (decorator === Public) return false;
        if (decorator === OptionalAuth) return false;
        return false;
      });

      expect(() => guard.canActivate(mockContext)).toThrow(UnauthorizedException);
    });

    it('should skip token parsing when route is public even if token exists', () => {
      const handler = jest.fn();
      const token = 'Bearer valid-token';
      
      mockRequest.headers = { authorization: token };
      mockContext.getHandler.mockReturnValue(handler);
      
      jest.spyOn(reflector, 'get').mockImplementation((decorator) => {
        if (decorator === Public) return true;
        return false;
      });

      const result = guard.canActivate(mockContext);

      expect(result).toBe(true);
      expect(extractUser.parseSessionToken).not.toHaveBeenCalled();
      expect(mockRequest.session).toBeUndefined();
    });
  });
});
