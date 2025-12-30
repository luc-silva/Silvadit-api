import { TestingModule, Test } from '@nestjs/testing';
import { MockForumRepository } from 'test/mock/repositories/forum.repository';
import { FORUM_REPOSITORY_TOKEN } from '~/api/forum/repository/forum.repository.base';
import { ForumService } from '~/api/forum/forum.service';
import { MockUserRepository } from 'test/mock/repositories/user.repository';
import { USER_REPOSITORY_TOKEN } from '~/api/user/repository/user.repository.token';
import {
  createForumRaw,
  createForumCreateDto,
  createForumCreateParams,
  createForumOutput,
  createForumDetailsParams,
  createForumMembersOutput,
  createForumMembersRaw,
  createGetForumMemberFilterDTO,
  createGetForumMembersParams,
} from 'test/mock/data/forum';
import { ForumMapper } from '~/api/forum/utils/forum.mapper';
import { CreateForumDataDTO } from '~/api/forum/types/forum.dto';
import { ForumValidator } from '~/api/forum/utils/forum.validator';
import { createSessionMock } from 'test/mock/data/auth';
import { FORUM_MEMBERS_REPOSITORY_TOKEN } from '~/api/forum_members/repository/forum_members.repository.base';
import { MockForumMembersRepository } from 'test/mock/repositories/forum_members.repository';
import { createCompletedUserData } from 'test/mock/data/user';
import { POST_REPOSITORY_TOKEN } from '~/api/post/repository/post.repository.base';
import { MockPostRepository } from 'test/mock/repositories/post.repository';

describe('forumService', () => {
  let forumService: ForumService;
  let forumRepositoryMock: MockForumRepository;
  let userRepository: MockUserRepository;
  let forumMembersRepositoryMock: MockForumMembersRepository;
  let postRepositoryMock: MockPostRepository;

  beforeEach(async () => {
    forumRepositoryMock = new MockForumRepository();
    userRepository = new MockUserRepository();
    forumMembersRepositoryMock = new MockForumMembersRepository();
    postRepositoryMock = new MockPostRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ForumService,
        { provide: FORUM_REPOSITORY_TOKEN, useValue: {} },
        { provide: USER_REPOSITORY_TOKEN, useValue: {} },
        { provide: FORUM_MEMBERS_REPOSITORY_TOKEN, useValue: {} },
        { provide: POST_REPOSITORY_TOKEN, useValue: {} },
      ],
    })
      .overrideProvider(FORUM_REPOSITORY_TOKEN)
      .useValue(forumRepositoryMock)
      .overrideProvider(USER_REPOSITORY_TOKEN)
      .useValue(userRepository)
      .overrideProvider(FORUM_MEMBERS_REPOSITORY_TOKEN)
      .useValue(forumMembersRepositoryMock)
      .overrideProvider(POST_REPOSITORY_TOKEN)
      .useValue(postRepositoryMock)
      .compile();

    forumService = module.get<ForumService>(ForumService);
  });

  describe('POST - createForum', () => {
    it('Should create exception if user is not found', async () => {
      const dto = createForumCreateDto();
      const sessionMock = createSessionMock();

      userRepository.getUserByIdOrUsername.mockResolvedValue(null);

      await expect(forumService.createForum(dto, sessionMock)).rejects.toThrow(
        'User not found.',
      );
    });

    it('Should create exception if user is not found', async () => {
      const dto = createForumCreateDto();
      const sessionMock = createSessionMock();

      userRepository.getUserByIdOrUsername.mockResolvedValue(null);

      await expect(forumService.createForum(dto, sessionMock)).rejects.toThrow(
        'User not found.',
      );
    });

    it('Should call ForumRepository correclty', async () => {
      const dto = createForumCreateDto();
      const sessionMock = createSessionMock({ id: 'abc' });
      const userMock = createCompletedUserData({ userId: 'abc' });
      const expected: ICreateForumParams = createForumCreateParams();

      userRepository.getUserByIdOrUsername.mockResolvedValue(userMock);
      forumRepositoryMock.createForum.mockResolvedValue({ id: 'ABC' });

      await forumService.createForum(dto, sessionMock);
      expect(forumRepositoryMock.createForum).toHaveBeenCalledWith(expected);
    });

    it('Should call ForumMembersRepository correctly', async () => {
      const dto = createForumCreateDto();
      const sessionMock = createSessionMock({ id: 'abc' });
      const userMock = createCompletedUserData({ userId: 'abc' });
      const expected: ISubscribeUserParams = {
        forum_id: '123',
        is_admin: 'S',
        is_founder: 'S',
        user_id: 'abc',
      };

      userRepository.getUserByIdOrUsername.mockResolvedValue(userMock);
      forumRepositoryMock.createForum.mockResolvedValue({ id: '123' });

      await forumService.createForum(dto, sessionMock);
      expect(forumMembersRepositoryMock.subscribeUser).toHaveBeenCalledWith(
        expected,
      );
    });
  });

  describe('GET - getForumDetails', () => {
    it('Should throw exception if forum not found', async () => {
      const sessionMock = createSessionMock();
      const forumIdMock = '123';

      await expect(
        forumService.getForumDetails(forumIdMock, sessionMock),
      ).rejects.toThrow('Forum not found.');
    });

    it('Should call repository correctly if session active', async () => {
      const sessionMock = createSessionMock();
      const forumIdMock = '123';
      const expected: IForumDetailsParams = {
        forum_id: '123',
        user_id: 'abc',
      };

      forumRepositoryMock.getForumDetails.mockResolvedValue(createForumRaw());
      userRepository.getUserByIdOrUsername.mockResolvedValue(
        createCompletedUserData({ userId: 'abc' }),
      );
      forumMembersRepositoryMock.getForumStaff.mockResolvedValue([
        createForumMembersRaw(),
      ]);

      await forumService.getForumDetails(forumIdMock, sessionMock);
      await expect(forumRepositoryMock.getForumDetails).toHaveBeenCalledWith(
        expected,
      );
    });

    it('Should call repository correctly if session not active', async () => {
      const sessionMock = null;
      const forumIdMock = '123';
      const expected: IForumDetailsParams = {
        forum_id: '123',
        user_id: null,
      };

      forumRepositoryMock.getForumDetails.mockResolvedValue(createForumRaw());
      forumMembersRepositoryMock.getForumStaff.mockResolvedValue([
        createForumMembersRaw(),
      ]);

      await forumService.getForumDetails(forumIdMock, sessionMock);
      await expect(forumRepositoryMock.getForumDetails).toHaveBeenCalledWith(
        expected,
      );
    });

    it('Should call forum members epository correctly if session not active', async () => {
      const sessionMock = null;
      const forumIdMock = '123';
      const expected: IGetForumStaffParams = {
        forum_id: '123',
      };

      forumRepositoryMock.getForumDetails.mockResolvedValue(createForumRaw());
      forumMembersRepositoryMock.getForumStaff.mockResolvedValue([
        createForumMembersRaw(),
      ]);

      await forumService.getForumDetails(forumIdMock, sessionMock);
      await expect(
        forumMembersRepositoryMock.getForumStaff,
      ).toHaveBeenCalledWith(expected);
    });
  });

  describe('POST - subscribeForum', () => {
    it('Should throw error if user is not found', async () => {
      const id = 'abc';
      const session = createSessionMock();

      userRepository.getUserByIdOrUsername.mockResolvedValue(null);

      await expect(forumService.subscribeForum(id, session)).rejects.toThrow(
        'User not found.',
      );
    });

    it('Should throw error if forum is not found', async () => {
      const id = 'abc';
      const session = createSessionMock();

      userRepository.getUserByIdOrUsername.mockResolvedValue(
        createCompletedUserData(),
      );
      forumRepositoryMock.getForumById.mockResolvedValue(null);

      await expect(forumService.subscribeForum(id, session)).rejects.toThrow(
        'Forum not found.',
      );
    });

    it('Should call subscribe user correctly if user is not subscribed', async () => {
      const id = 'abc';
      const session = createSessionMock();
      const user = createCompletedUserData();
      const forum = createForumRaw({ forum_id: id });
      const expected = {
        user_id: user.userId,
        forum_id: forum.forum_id,
        is_admin: 'N',
        is_founder: 'N',
      };

      userRepository.getUserByIdOrUsername.mockResolvedValue(user);
      forumRepositoryMock.getForumById.mockResolvedValue(forum);
      forumMembersRepositoryMock.checkIfUserSubscribed.mockResolvedValue(null);

      await forumService.subscribeForum(id, session);
      expect(forumMembersRepositoryMock.subscribeUser).toHaveBeenCalledWith(
        expected,
      );
    });

    it('Should call unsubscribe user correctly if user is subscribed', async () => {
      const id = 'abc';
      const session = createSessionMock();
      const user = createCompletedUserData();
      const forum = createForumRaw({ forum_id: id });
      const expected = {
        user_id: user.userId,
        forum_id: forum.forum_id,
      };

      userRepository.getUserByIdOrUsername.mockResolvedValue(user);
      forumRepositoryMock.getForumById.mockResolvedValue(forum);
      forumMembersRepositoryMock.checkIfUserSubscribed.mockResolvedValue(1);

      await forumService.subscribeForum(id, session);
      expect(forumMembersRepositoryMock.unsubscribeUser).toHaveBeenCalledWith(
        expected,
      );
    });
  });

  describe('GET - getPostsFromForum', () => {
    it('Should throw exception if forum not found.', async () => {
      const forumIdMock = 'ABC';
      const session = createSessionMock();

      forumRepositoryMock.getForumById.mockResolvedValue(null);

      await expect(
        forumService.getPostsFromForum(forumIdMock, session),
      ).rejects.toThrow('Forum not found.');
    });

    it('Should throw exception if forum private and user not authed.', async () => {
      const forumIdMock = 'ABC';
      const forumMock = createForumRaw({ is_private: 'S' });

      userRepository.getUserByIdOrUsername.mockResolvedValue(null);
      forumRepositoryMock.getForumById.mockResolvedValue(forumMock);

      await expect(
        forumService.getPostsFromForum(forumIdMock, null),
      ).rejects.toThrow('User not allowed without following the forum.');
    });

    it('Should throw exception if forum private and user not found.', async () => {
      const forumIdMock = 'ABC';
      const session = createSessionMock();
      const forumMock = createForumRaw({ is_private: 'S' });

      userRepository.getUserByIdOrUsername.mockResolvedValue(null);
      forumRepositoryMock.getForumById.mockResolvedValue(forumMock);

      await expect(
        forumService.getPostsFromForum(forumIdMock, session),
      ).rejects.toThrow('User not found.');
    });

    it('Should not get posts from a private forum which user doesnt have access', async () => {
      const forumIdMock = 'ABC';
      const session = createSessionMock();

      const forumMock = createForumRaw({ is_private: 'S' });
      const userMock = createCompletedUserData();

      userRepository.getUserByIdOrUsername.mockResolvedValue(userMock);
      forumRepositoryMock.getForumById.mockResolvedValue(forumMock);
      forumMembersRepositoryMock.checkIfUserSubscribed.mockResolvedValue(null);

      await expect(
        forumService.getPostsFromForum(forumIdMock, session),
      ).rejects.toThrow('User not allowed.');
    });

    it('Should call post repository correctly', async () => {
      const forumIdMock = 'ABC';
      const session = createSessionMock();

      const forumMock = createForumRaw({ is_private: 'S' });
      const userMock = createCompletedUserData();

      const expected: IGetPostsFilter = {
        forum_id: forumIdMock,
        nsfw: 'N',
        user_id: userMock.userId,
        items_per_page: 10,
        page: 1,
      };

      userRepository.getUserByIdOrUsername.mockResolvedValue(userMock);
      forumRepositoryMock.getForumById.mockResolvedValue(forumMock);
      forumMembersRepositoryMock.checkIfUserSubscribed.mockResolvedValue(1);
      postRepositoryMock.getPosts.mockResolvedValue([]);

      await forumService.getPostsFromForum(forumIdMock, session);
      expect(postRepositoryMock.getPosts).toHaveBeenCalledWith(expected);
    });
  });

  describe('GET - getForumMembers', () => {
    it('Should throw error if forum not exist', async () => {
      const forumMock = createGetForumMemberFilterDTO();
      const sessionMock = createSessionMock();

      await expect(
        forumService.getForumMembers(forumMock, sessionMock),
      ).rejects.toThrow('Forum not found.');
    });

    it('Should throw error if session specified and user does not exist', async () => {
      const forumMock = createGetForumMemberFilterDTO();
      const sessionMock = createSessionMock();

      forumRepositoryMock.getForumById.mockResolvedValue(
        createForumRaw({ is_private: 'S' }),
      );

      await expect(
        forumService.getForumMembers(forumMock, sessionMock),
      ).rejects.toThrow('User not found.');
    });

    it('Should throw exception if forum private and user not authed.', async () => {
      const forumMock = createGetForumMemberFilterDTO();

      forumRepositoryMock.getForumById.mockResolvedValue(
        createForumRaw({ is_private: 'S' }),
      );
      userRepository.getUserByIdOrUsername.mockResolvedValue(
        createCompletedUserData(),
      );

      await expect(
        forumService.getForumMembers(forumMock, null),
      ).rejects.toThrow('User not allowed without following the forum.');
    });

    it('Should throw error if forum is private and user doesnt not follow', async () => {
      const forumMock = createGetForumMemberFilterDTO();
      const sessionMock = createSessionMock();

      forumRepositoryMock.getForumById.mockResolvedValue(
        createForumRaw({ is_private: 'S' }),
      );
      userRepository.getUserByIdOrUsername.mockResolvedValue(
        createCompletedUserData(),
      );

      await expect(
        forumService.getForumMembers(forumMock, sessionMock),
      ).rejects.toThrow('User not allowed.');
    });

    it('Should call repository correctly', async () => {
      const forumMock = createGetForumMemberFilterDTO();
      const sessionMock = createSessionMock();
      const expectedParams = createGetForumMembersParams();
      const expectedOrders: IGetForumMembersOrder = {
        column: "UA.FIRST_NAME || '' || UA.LAST_NAME",
        direction: 'ASC',
      };

      forumRepositoryMock.getForumById.mockResolvedValue(
        createForumRaw({ is_private: 'S' }),
      );
      userRepository.getUserByIdOrUsername.mockResolvedValue(
        createCompletedUserData(),
      );
      forumMembersRepositoryMock.checkIfUserSubscribed.mockResolvedValue(1);
      forumMembersRepositoryMock.getForumMembers.mockResolvedValue([
        createForumMembersRaw(),
      ]);

      await forumService.getForumMembers(forumMock, sessionMock);
      expect(forumMembersRepositoryMock.getForumMembers).toHaveBeenCalledWith(
        expectedParams,
        expectedOrders,
      );
    });

    it('Should return mapped members correctly', async () => {
      const forumMock = createGetForumMemberFilterDTO();
      const sessionMock = createSessionMock();
      const expected = [createForumMembersOutput()];

      forumRepositoryMock.getForumById.mockResolvedValue(
        createForumRaw({ is_private: 'S' }),
      );
      userRepository.getUserByIdOrUsername.mockResolvedValue(
        createCompletedUserData(),
      );
      forumMembersRepositoryMock.checkIfUserSubscribed.mockResolvedValue(1);
      forumMembersRepositoryMock.getForumMembers.mockResolvedValue([
        createForumMembersRaw(),
      ]);

      const result = await forumService.getForumMembers(forumMock, sessionMock);

      expect(result).toEqual(expected);
    });
  });
});
