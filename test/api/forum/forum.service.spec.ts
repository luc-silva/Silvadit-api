import { TestingModule, Test } from '@nestjs/testing';
import { MockForumRepository } from 'test/mock/repositories/forum.repository';
import { FORUM_REPOSITORY_TOKEN } from '~/api/forum/repository/forum.repository.base';
import { ForumService } from '~/api/forum/forum.service';
import { MockUserRepository } from 'test/mock/repositories/user.repository';
import { USER_REPOSITORY_TOKEN } from '~/api/user/repository/user.repository.token';
import {
  createForumCreateDto,
  createForumCreateParams,
} from 'test/mock/data/forum';
import { ForumMapper } from '~/api/forum/utils/forum.mapper';
import { CreateForumDataDTO } from '~/api/forum/types/forum.dto';
import { ForumValidator } from '~/api/forum/utils/forum.validator';
import { createSessionMock } from 'test/mock/data/auth';
import { POST_REPOSITORY_TOKEN } from '~/api/post/repository/post.repository.base';
import { MockPostRepository } from 'test/mock/repositories/post.repository';
import { CreatePostDTO } from '~/api/post/types/post.dto';
import { createCompletedUserData } from 'test/mock/data/user';
import { createPostCreateParams, createPostDTO } from 'test/mock/data/post';

describe('forumService', () => {
  let forumService: ForumService;
  let forumRepositoryMock: MockForumRepository;
  let userRepository: MockUserRepository;
  let postRepositoryMock: MockPostRepository;

  beforeEach(async () => {
    forumRepositoryMock = new MockForumRepository();
    userRepository = new MockUserRepository();
    postRepositoryMock = new MockPostRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ForumService,
        { provide: FORUM_REPOSITORY_TOKEN, useValue: {} },
        { provide: USER_REPOSITORY_TOKEN, useValue: {} },
        { provide: POST_REPOSITORY_TOKEN, useValue: {} },
      ],
    })
      .overrideProvider(USER_REPOSITORY_TOKEN)
      .useValue(userRepository)
      .overrideProvider(FORUM_REPOSITORY_TOKEN)
      .useValue(forumRepositoryMock)
      .overrideProvider(POST_REPOSITORY_TOKEN)
      .useValue(postRepositoryMock)
      .compile();

    forumService = module.get<ForumService>(ForumService);
  });

  describe('Mapper', () => {
    it('should map DTO into create forum params correctly', () => {
      const expected = createForumCreateParams();
      const result = ForumMapper.createForum(createForumCreateDto());

      expect(result).toEqual(expected);
    });
  });

  describe('Validator', () => {
    describe('createForum', () => {
      it('Should invalidate invalidate data correctly', () => {
        expect(() => {
          ForumValidator.createForum({} as CreateForumDataDTO);
        }).toThrow('Invalid data.');
      });

      it('Should invalidate validate data correctly', () => {
        expect(() => {
          ForumValidator.createForum(createForumCreateDto());
        }).not.toThrow('Invalid data.');
      });
    });
  });

  describe('createForum', () => {
    it('Should create exception if user is not found', () => {
      const dto = createForumCreateDto();
      const sessionMock = createSessionMock();

      userRepository.getUserByIdOrUsername.mockResolvedValue(null);

      expect(forumService.createForum(dto, sessionMock)).rejects.toThrow(
        'User not found.',
      );
    });

    it('Should create exception if user is not found', () => {
      const dto = createForumCreateDto();
      const sessionMock = createSessionMock();

      userRepository.getUserByIdOrUsername.mockResolvedValue(null);

      expect(forumService.createForum(dto, sessionMock)).rejects.toThrow(
        'User not found.',
      );
    });
  });

  describe('createPost', () => {
    it('Should create exception if user is not found', () => {
      const dto = createPostDTO({ forumId: '123' });
      const sessionMock = createSessionMock();

      userRepository.getUserByIdOrUsername.mockResolvedValue(null);

      expect(forumService.createPost(dto, sessionMock)).rejects.toThrow(
        'User not found.',
      );
    });

    it('Should throw exception when post data is invalid', () => {
      const dto = createPostDTO({
        forumId: '123',
        content: null,
      } as unknown as CreatePostDTO);
      const sessionMock = createSessionMock();

      userRepository.getUserByIdOrUsername.mockResolvedValue(
        createCompletedUserData(),
      );

      expect(forumService.createPost(dto, sessionMock)).rejects.toThrow(
        'Invalid data.',
      );
    });

    it('Should create post sucessfully', async () => {
      const dto = createPostDTO({
        forumId: '123',
      });
      const sessionMock = createSessionMock({ id: '123' });

      const expected = createPostCreateParams({
        user_id: sessionMock.id,
        forum_id: dto.forumId,
      });

      userRepository.getUserByIdOrUsername.mockResolvedValue(
        createCompletedUserData({ userId: '123' }),
      );

      await expect(
        forumService.createPost(dto, sessionMock),
      ).resolves.not.toThrow('Invalid data.');
      await expect(
        forumService.createPost(dto, sessionMock),
      ).resolves.not.toThrow('User not found.');

      expect(postRepositoryMock.createPost).toHaveBeenCalledWith(expected);
    });
  });
});
