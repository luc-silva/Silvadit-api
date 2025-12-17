import { Test, TestingModule } from '@nestjs/testing';
import { createCompletedUserData, createUserOutput } from 'test/mock/data/user';
import { MockForumMembersRepository } from 'test/mock/repositories/forum_members.repository';
import { MockPostRepository } from 'test/mock/repositories/post.repository';
import { MockUserRepository } from 'test/mock/repositories/user.repository';
import { FORUM_MEMBERS_REPOSITORY_TOKEN } from '~/api/forum_members/repository/forum_members.repository.base';
import { POST_REPOSITORY_TOKEN } from '~/api/post/repository/post.repository.base';
import { USER_REPOSITORY_TOKEN } from '~/api/user/repository/user.repository.token';
import { UserService } from '~/api/user/user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockUserRepository;
  let postRepository: MockPostRepository;
  let forumMembersRepository: MockForumMembersRepository;

  beforeEach(async () => {
    userRepository = new MockUserRepository();
    postRepository = new MockPostRepository();
    forumMembersRepository = new MockForumMembersRepository();

    const module: TestingModule = await Test.createTestingModule({
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

    userService = module.get<UserService>(UserService);
  });

  describe('GET', () => {
    it('getUserDetails - should create exception if user has not been found', async () => {
      const userID = 'ABCDEFG!@#';

      userRepository.getUserDetails.mockResolvedValue(null);

      await expect(userService.getUserDetails(userID)).rejects.toThrow(
        'User not found.',
      );
    });

    it('getUserDetails - should return user details correctly', async () => {
      const userID = 'ABCDEFG';

      userRepository.getUserDetails.mockResolvedValue(createUserOutput());

      await expect(userService.getUserDetails(userID)).resolves;
      expect(userRepository.getUserDetails).toHaveBeenCalledWith(userID);
    });

    it('getUserPosts - should create exception if user is invalid', async () => {
      const userID = 'ABCDEFG';

      userRepository.getUserByIdOrUsername.mockResolvedValue(null);
      postRepository.getPosts.mockResolvedValue([]);

      await expect(userService.getUserPosts(userID)).rejects.toThrow(
        'User not found.',
      );
    });

    it('getUserPosts - should list user posts correctly', async () => {
      const userId = 'ABCDEFG';

      userRepository.getUserByIdOrUsername.mockResolvedValue(
        createCompletedUserData({ userId }),
      );
      postRepository.getPosts.mockResolvedValue([]);

      await expect(userService.getUserPosts(userId)).resolves;
      expect(postRepository.getPosts).toHaveBeenCalledWith(userId);
    });

    it('getUserSubscribedForums - should create exception if user is invalid', async () => {
      const userID = 'ABCDEFG';

      userRepository.getUserByIdOrUsername.mockResolvedValue(null);
      postRepository.getPosts.mockResolvedValue([]);

      await expect(userService.getUserSubscribedForums(userID)).rejects.toThrow(
        'User not found.',
      );
    });

    it('getUserSubscribedForums - should list user subscribed forums correctly', async () => {
      const userId = 'ABCDEFG';

      userRepository.getUserDetails.mockResolvedValue(
        createUserOutput({ userId }),
      );

      forumMembersRepository.getForumsFromUser.mockResolvedValue([]);

      await expect(userService.getUserSubscribedForums(userId)).resolves;
      expect(forumMembersRepository.getForumsFromUser).toHaveBeenCalledWith(userId);
    });

    it('getUserFollowedUsers - should create exception if user is invalid', async () => {
      const userID = 'ABCDEFG';

      userRepository.getUserByIdOrUsername.mockResolvedValue(null);
      postRepository.getPosts.mockResolvedValue([]);

      await expect(userService.getUserFollowedUsers(userID)).rejects.toThrow(
        'User not found.',
      );
    });

    it('getUserFollowedUsers - should list user subscribed forums correctly', async () => {
      const userId = 'ABCDEFG';

      userRepository.getUserDetails.mockResolvedValue(
        createUserOutput({ userId }),
      );

      await expect(userService.getUserFollowedUsers(userId)).resolves;
      expect(userRepository.getUserFollowingAccounts).toHaveBeenCalledWith(
        userId,
      );
    });

    it('getUserFollowers - should list user followers correctly', () => {
      const userID = 'ABCDEFG';

      expect(userService.getUserFollowers(userID)).resolves;
      expect(userRepository.getUserFollowers).toHaveBeenCalledWith(userID);
    });
  });
});
