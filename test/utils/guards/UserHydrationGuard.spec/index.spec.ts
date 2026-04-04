import { ExecutionContext, CallHandler } from '@nestjs/common';
import { Request } from 'express';
import { UserHydrationInteceptor } from '~/utils/guards/UserHydrationGuard';
import { UserRepositoryBase } from '~/api/user/repository/user.repository.base';
import { USER_REPOSITORY_TOKEN } from '~/api/user/repository/user.repository.token';

describe('UserHydrationInteceptor', () => {
  let interceptor: UserHydrationInteceptor;
  let mockUserRepository: jest.Mocked<UserRepositoryBase>;
  let mockContext: jest.Mocked<ExecutionContext>;
  let mockRequest: Partial<Request>;
  let mockNext: jest.Mocked<CallHandler>;

  beforeEach(() => {
    mockUserRepository = {
      getUserByIdOrUsername: jest.fn(),
    } as unknown as jest.Mocked<UserRepositoryBase>;

    interceptor = new UserHydrationInteceptor(mockUserRepository);

    mockRequest = {
      headers: {},
      session: undefined,
      userData: undefined,
    } as Partial<Request>;

    mockContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      }),
    } as unknown as jest.Mocked<ExecutionContext>;

    mockNext = {
      handle: jest.fn().mockReturnValue(Promise.resolve('response')),
    } as unknown as jest.Mocked<CallHandler>;

    jest.clearAllMocks();
  });

  describe('intercept', () => {
    it('should set userData to null when session is not present', async () => {
      mockRequest.session = undefined;

      await interceptor.intercept(mockContext, mockNext);

      expect(mockRequest.userData).toBeNull();
      expect(mockUserRepository.getUserByIdOrUsername).not.toHaveBeenCalled();
      expect(mockNext.handle).toHaveBeenCalled();
    });

    it('should set userData to null when session is null (type override)', async () => {
      mockRequest.session = null as any;

      await interceptor.intercept(mockContext, mockNext);

      expect(mockRequest.userData).toBeNull();
      expect(mockUserRepository.getUserByIdOrUsername).not.toHaveBeenCalled();
      expect(mockNext.handle).toHaveBeenCalled();
    });

    it('should fetch user data when session is present', async () => {
      const mockSession = { id: '123', username: 'testuser' };
      const mockUser = {
        id: '123',
        username: 'testuser',
        email: 'test@example.com',
      };

      mockRequest.session = mockSession as unknown as ISession;
      mockUserRepository.getUserByIdOrUsername.mockResolvedValue(
        mockUser as any,
      );

      await interceptor.intercept(mockContext, mockNext);

      expect(mockUserRepository.getUserByIdOrUsername).toHaveBeenCalledWith(
        '123',
      );
      expect(mockRequest.userData).toEqual(mockUser);
      expect(mockNext.handle).toHaveBeenCalled();
    });

    it('should use session.id to fetch user', async () => {
      const mockSession = { id: 'user-456', username: 'john_doe' };
      const mockUser = {
        id: 'user-456',
        username: 'john_doe',
        email: 'john@example.com',
      };

      mockRequest.session = mockSession as unknown as ISession;
      mockUserRepository.getUserByIdOrUsername.mockResolvedValue(
        mockUser as any,
      );

      await interceptor.intercept(mockContext, mockNext);

      expect(mockUserRepository.getUserByIdOrUsername).toHaveBeenCalledWith(
        'user-456',
      );
      expect(mockRequest.userData).toEqual(mockUser);
    });

    it('should set userData to fetched user even if user is null', async () => {
      const mockSession = { id: '999', username: 'nonexistent' };

      mockRequest.session = mockSession as unknown as ISession;
      mockUserRepository.getUserByIdOrUsername.mockResolvedValue(null);

      await interceptor.intercept(mockContext, mockNext);

      expect(mockUserRepository.getUserByIdOrUsername).toHaveBeenCalledWith(
        '999',
      );
      expect(mockRequest.userData).toBeNull();
      expect(mockNext.handle).toHaveBeenCalled();
    });

    it('should propagate errors from userRepository', async () => {
      const mockSession = { id: '123', username: 'testuser' };
      const mockError = new Error('Database error');

      mockRequest.session = mockSession as unknown as ISession;
      mockUserRepository.getUserByIdOrUsername.mockRejectedValue(mockError);

      await expect(
        interceptor.intercept(mockContext, mockNext),
      ).rejects.toThrow('Database error');

      expect(mockUserRepository.getUserByIdOrUsername).toHaveBeenCalledWith(
        '123',
      );
      expect(mockNext.handle).not.toHaveBeenCalled();
    });

    it('should always call next.handle when successful', async () => {
      const mockSession = { id: '123', username: 'testuser' };
      const mockUser = { id: '123', username: 'testuser' };

      mockRequest.session = mockSession as unknown as ISession;
      mockUserRepository.getUserByIdOrUsername.mockResolvedValue(
        mockUser as any,
      );

      await interceptor.intercept(mockContext, mockNext);

      expect(mockNext.handle).toHaveBeenCalledTimes(1);
    });

    it('should not call next.handle when userRepository throws', async () => {
      const mockSession = { id: '123', username: 'testuser' };

      mockRequest.session = mockSession as unknown as ISession;
      mockUserRepository.getUserByIdOrUsername.mockRejectedValue(
        new Error('DB Error'),
      );

      await expect(
        interceptor.intercept(mockContext, mockNext),
      ).rejects.toThrow();

      expect(mockNext.handle).not.toHaveBeenCalled();
    });
  });
});
