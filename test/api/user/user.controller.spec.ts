import { Test, TestingModule } from '@nestjs/testing';
import { createSessionMock } from 'test/mock/data/auth';
import {
  createUpdateUserLocationDTO,
  createUserDetailsData,
  createUserDetailsRaw,
  createUserUpdateDetailsDTO,
} from 'test/mock/data/user';
import { MockForumMembersRepository } from 'test/mock/repositories/forum_members.repository';
import { MockPostRepository } from 'test/mock/repositories/post.repository';
import { MockUserRepository } from 'test/mock/repositories/user.repository';
import { FORUM_MEMBERS_REPOSITORY_TOKEN } from '~/api/forum_members/repository/forum_members.repository.base';
import { POST_REPOSITORY_TOKEN } from '~/api/post/repository/post.repository.base';
import { USER_REPOSITORY_TOKEN } from '~/api/user/repository/user.repository.token';
import { UserService } from '~/api/user/user.service';
import { UserController } from '~/api/user/user.controller';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let userRepository: MockUserRepository;
  let forumMembersRepository: MockForumMembersRepository;

  beforeEach(async () => {
    userRepository = new MockUserRepository();
    const postRepository = new MockPostRepository();
    forumMembersRepository = new MockForumMembersRepository();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {},
        },
        {
          provide: POST_REPOSITORY_TOKEN,
          useValue: {},
        },
        {
          provide: FORUM_MEMBERS_REPOSITORY_TOKEN,
          useValue: {},
        },
      ],
    })
      .overrideProvider(USER_REPOSITORY_TOKEN)
      .useValue(userRepository)
      .overrideProvider(POST_REPOSITORY_TOKEN)
      .useValue(postRepository)
      .overrideProvider(FORUM_MEMBERS_REPOSITORY_TOKEN)
      .useValue(forumMembersRepository)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('GET /user/:id', () => {
    it('should return user details with resource structure', async () => {
      const userId = 'ABCDEFG';
      const expectedData = createUserDetailsData();

      userRepository.getUserDetails.mockResolvedValue(createUserDetailsRaw());

      const result = await userController.getUserDetails(userId);

      expect(result).toHaveProperty('success', true);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('statusCode');
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('_links');
      expect(result.data).toEqual(expectedData);
    });

    it('should include correct links in response', async () => {
      const userId = 'ABCDEFG';

      userRepository.getUserDetails.mockResolvedValue(createUserDetailsRaw());

      const result = await userController.getUserDetails(userId);

      expect(result._links).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ rel: 'self', href: `/user/${userId}` }),
          expect.objectContaining({
            rel: 'followers',
            href: `/user/${userId}/followers`,
          }),
          expect.objectContaining({
            rel: 'following',
            href: `/user/${userId}/following/users`,
          }),
          expect.objectContaining({
            rel: 'feed',
            href: `/user/${userId}/feed`,
          }),
        ]),
      );
    });

    it('should throw error when user is not found', async () => {
      const userId = 'INVALID_USER';

      userRepository.getUserDetails.mockResolvedValue(null);

      await expect(userController.getUserDetails(userId)).rejects.toThrow(
        'User not found.',
      );
    });
  });

  describe('GET /user/:id/followers', () => {
    it('should return followers with resource structure', async () => {
      const userId = 'ABCDEFG';
      const mockFollowers = [
        { userId: '123', dateCreated: new Date(), total: 10 },
      ];

      userRepository.getUserFollowers.mockResolvedValue(mockFollowers);

      const result = await userController.getUserFollowers(userId);

      expect(result).toHaveProperty('success', true);
      expect(result).toHaveProperty('data');
      expect(result.data).toEqual(mockFollowers);
      expect(result._links).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ rel: 'self' }),
          expect.objectContaining({ rel: 'user' }),
        ]),
      );
    });
  });

  describe('GET /user/:id/following/users', () => {
    it('should return followed users with resource structure', async () => {
      const userId = 'ABCDEFG';
      const mockFollowed = [
        {
          userId: '123',
          dateCreated: new Date(),
          total: 5,
          ...createUserDetailsRaw(),
        },
      ];

      userRepository.getUserDetails.mockResolvedValue(createUserDetailsRaw());
      userRepository.getUserFollowingAccounts.mockResolvedValue(mockFollowed);

      const result = await userController.getUserFollowedUsers(userId);

      expect(result).toHaveProperty('success', true);
      expect(result).toHaveProperty('data');
      expect(result.data).toEqual(mockFollowed);
    });

    it('should throw error when user is not found', async () => {
      const userId = 'INVALID_USER';

      userRepository.getUserByIdOrUsername.mockResolvedValue(null);

      await expect(
        userController.getUserFollowedUsers(userId),
      ).rejects.toThrow('User not found.');
    });
  });

  describe('GET /user/:id/following/forums', () => {
    it('should return subscribed forums with resource structure', async () => {
      const userId = 'ABCDEFG';
      const mockForums = [
        {
          is_admin: 'N' as const,
          is_founder: 'N' as const,
          member_since: new Date(),
          forum_id: '123',
          forum_name: 'Test Forum',
          forum_followers: 100,
          forum_description: 'Test description',
          forum_is_banned: 'N' as const,
        },
      ];

      userRepository.getUserDetails.mockResolvedValue(createUserDetailsRaw());
      forumMembersRepository.getForumsFromUser.mockResolvedValue(mockForums);

      const result = await userController.getUserFollowedForums(userId);

      expect(result).toHaveProperty('success', true);
      expect(result).toHaveProperty('data');
    });

    it('should throw error when user is not found', async () => {
      const userId = 'INVALID_USER';

      userRepository.getUserByIdOrUsername.mockResolvedValue(null);

      await expect(
        userController.getUserFollowedForums(userId),
      ).rejects.toThrow('User not found.');
    });
  });

  describe('GET /user/:id/feed', () => {
    it('should return user activity feed with resource structure', async () => {
      const userId = 'ABCDEFG';
      const mockActivity = [];

      const result = await userController.getUserPost(userId);

      expect(result).toHaveProperty('success', true);
      expect(result).toHaveProperty('message');
      expect(result.data).toEqual([]);
    });
  });

  describe('PUT /user/details', () => {
    it('should update user details with resource structure', async () => {
      const session = createSessionMock();
      const dto = createUserUpdateDetailsDTO();

      userRepository.getUserByIdOrUsername.mockResolvedValue({
        userId: session.id,
        username: 'test',
        email: 'test@test.com',
        first_name: 'Test',
        last_name: 'User',
        country: 'BR',
        state: 'SP',
        password: '123',
      });

      const result = await userController.updateUserDetails(dto, session);

      expect(result).toHaveProperty('success', true);
      expect(result.message).toBe('User details updated successfully');
      expect(result._links).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ rel: 'self' }),
          expect.objectContaining({ rel: 'update' }),
        ]),
      );
    });

    it('should throw error when user is not found', async () => {
      const session = createSessionMock();
      const dto = createUserUpdateDetailsDTO();

      userRepository.getUserByIdOrUsername.mockResolvedValue(null);

      await expect(
        userController.updateUserDetails(dto, session),
      ).rejects.toThrow('User not found.');
    });
  });

  describe('PUT /user/location', () => {
    it('should update user location with resource structure', async () => {
      const session = createSessionMock();
      const dto = createUpdateUserLocationDTO();

      userRepository.getUserByIdOrUsername.mockResolvedValue({
        userId: session.id,
        username: 'test',
        email: 'test@test.com',
        first_name: 'Test',
        last_name: 'User',
        country: 'BR',
        state: 'SP',
        password: '123',
      });

      const result = await userController.updateUserLocation(dto, session);

      expect(result).toHaveProperty('success', true);
      expect(result.message).toBe('User location updated successfully');
    });

    it('should throw error when user is not found', async () => {
      const session = createSessionMock();
      const dto = createUpdateUserLocationDTO();

      userRepository.getUserByIdOrUsername.mockResolvedValue(null);

      await expect(
        userController.updateUserLocation(dto, session),
      ).rejects.toThrow('User not found.');
    });
  });
});
