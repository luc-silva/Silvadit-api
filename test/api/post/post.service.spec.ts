import { TestingModule, Test } from '@nestjs/testing';
import { MockPostRepository } from 'test/mock/repositories/post.repository';
import { POST_REPOSITORY_TOKEN } from '~/api/post/repository/post.repository.base';
import { PostService } from '~/api/post/post.service';
import { COMMENTARY_REPOSITORY_TOKEN } from '~/api/commentary/repository/commentary.repository.base';
import { USER_REPOSITORY_TOKEN } from '~/api/user/repository/user.repository.token';
import { MockUserRepository } from 'test/mock/repositories/user.repository';
import { MockCommentaryRepository } from 'test/mock/repositories/commentary.repository';
import { PostValidator } from '~/api/post/utils/post.validator';
import { createPostDTO } from 'test/mock/data/home';
import { CreatePostDTO } from '~/api/post/types/post.dto';
import {
  createCommentaryParamsMock,
  createPostCommentaryDTO,
} from 'test/mock/data/commentary';
import { createSessionMock } from 'test/mock/data/auth';
import { CreatePostCommentaryDTO } from '~/api/commentary/types/commentary.dto';
import { createCompletedUserData } from 'test/mock/data/user';
import { PostMapper } from '~/api/post/utils/post.mapper';
import {
  createPostOutput,
  createPostRaw,
  createPostUpdateDto,
  createPostUpdateParams,
} from 'test/mock/data/post';

describe('postService', () => {
  let postService: PostService;
  let postRepository: MockPostRepository;
  let userRepository: MockUserRepository;
  let commentaryRepository: MockCommentaryRepository;

  beforeEach(async () => {
    postRepository = new MockPostRepository();
    userRepository = new MockUserRepository();
    commentaryRepository = new MockCommentaryRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: POST_REPOSITORY_TOKEN,
          useValue: {},
        },
        {
          provide: COMMENTARY_REPOSITORY_TOKEN,
          useValue: {},
        },
        { provide: USER_REPOSITORY_TOKEN, useValue: {} },
      ],
    })
      .overrideProvider(POST_REPOSITORY_TOKEN)
      .useValue(postRepository)
      .overrideProvider(COMMENTARY_REPOSITORY_TOKEN)
      .useValue(commentaryRepository)
      .overrideProvider(USER_REPOSITORY_TOKEN)
      .useValue(userRepository)
      .compile();

    postService = module.get<PostService>(PostService);
  });

  describe('Mapper', () => {
    describe('mapPostDetails', () => {
      const rawMock = createPostRaw();
      const result = PostMapper.mapPostDetails(rawMock);
      const expected = createPostOutput();

      expect(result).toEqual(expected);
    });

    describe('updatePost', () => {
      const rawMock = createPostUpdateDto();
      const result = PostMapper.updatePost(rawMock);
      const expected = createPostUpdateParams();

      expect(result).toEqual(expected);
    });
  });

  describe('Validator', () => {
    describe('createPost', () => {
      it('Should invalidate data if empty', () => {
        expect(() => {
          PostValidator.createPost({} as CreatePostDTO);
        }).toThrow('Invalid data.');
      });

      it('Should invalidate data if title is missing', () => {
        expect(() => {
          PostValidator.createPost(createPostDTO({ title: undefined }));
        }).toThrow('Invalid data.');
      });

      it('Should invalidate data if content is missing', () => {
        expect(() => {
          PostValidator.createPost(createPostDTO({ content: undefined }));
        }).toThrow('Invalid data.');
      });

      it('Should invalidate data if isNsfw is missing', () => {
        expect(() => {
          PostValidator.createPost(createPostDTO({ isNsfw: undefined }));
        }).toThrow('Invalid data.');
      });

      it('Should not invalidate data if nothing is missing', () => {
        expect(() => {
          PostValidator.createPost(createPostDTO());
        }).not.toThrow('Invalid data.');
      });
    });

    describe('createPostCommentary', () => {
      it('Should invalidate data if all field empty', () => {
        const mock = {
          content: null,
          postId: null,
          replyId: null,
        } as unknown as CreatePostCommentaryDTO;

        expect(() => PostValidator.createPostCommentary(mock)).toThrow(
          'Invalid data.',
        );
      });

      it('Should invalidate data if content field empty', () => {
        const mock = {
          content: null,
          postId: 'Lorem content',
          replyId: 'Lorem content',
        } as unknown as CreatePostCommentaryDTO;

        expect(() => PostValidator.createPostCommentary(mock)).toThrow(
          'Invalid data.',
        );
      });

      it('Should invalidate data if postId field empty', () => {
        const mock = {
          content: 'Lorem content',
          postId: null,
          replyId: 'Lorem content',
        } as unknown as CreatePostCommentaryDTO;

        expect(() => PostValidator.createPostCommentary(mock)).toThrow(
          'Invalid data.',
        );
      });

      it('Should not invalidate data if DTO is ok', () => {
        const mock = {
          content: 'Lorem content',
          postId: 'POST123',
          replyId: 'REPLY321',
        } as unknown as CreatePostCommentaryDTO;

        expect(() => PostValidator.createPostCommentary(mock)).not.toThrow(
          'Invalid data.',
        );
      });
    });
  });

  describe('createCommentary', () => {
    it('Should create exception if user has not been found', async () => {
      const data = createPostCommentaryDTO();
      const session = createSessionMock();
      await expect(
        postService.createPostCommentary(data, session),
      ).rejects.toThrow('User not found.');
    });

    it('Should create exception if DTO is invalid', async () => {
      const data = {
        ...createPostCommentaryDTO(),
        content: null,
      } as unknown as CreatePostCommentaryDTO;
      const session = createSessionMock();

      userRepository.getUserByIdOrUsername.mockResolvedValue(
        createCompletedUserData(),
      );

      await expect(
        postService.createPostCommentary(data, session),
      ).rejects.toThrow('Invalid data.');
    });

    it('Should call repository correctly', async () => {
      const userId = '123';
      const session = createSessionMock();
      const mockedDto = createPostCommentaryDTO();
      const expectCalledWith = createCommentaryParamsMock({ userId });

      userRepository.getUserByIdOrUsername.mockResolvedValue(
        createCompletedUserData({ userId }),
      );

      await expect(postService.createPostCommentary(mockedDto, session))
        .resolves;
      await expect(commentaryRepository.createCommentary).toHaveBeenCalledWith(
        expectCalledWith,
      );
    });
  });

  describe('getPostDetails', () => {
    it('should create exception if post has not been found', async () => {
      const postId = '123';
      await expect(postService.getPostDetails(postId)).rejects.toThrow(
        'Post not found.',
      );
    });
  });

  describe('updatePost', () => {
    it('Should create exception if post has not been found', async () => {
      const data = createPostUpdateDto();
      const session = createSessionMock();

      postRepository.getPostDetails.mockResolvedValue(null);
      await expect(postService.updatePost(data, session)).rejects.toThrow(
        'Post not found.',
      );
    });

    it('Should create exception if user has not been found', async () => {
      const data = createPostUpdateDto();
      const session = createSessionMock();

      postRepository.getPostDetails.mockResolvedValue(
        createPostRaw({ owner_id: '123' }),
      );

      userRepository.getUserByIdOrUsername.mockResolvedValue(null);

      await expect(postService.updatePost(data, session)).rejects.toThrow(
        'User not found.',
      );
    });

    it('Should create exception if post owner is diferrent from user', async () => {
      const data = createPostUpdateDto();
      const session = createSessionMock();

      postRepository.getPostDetails.mockResolvedValue(
        createPostRaw({ owner_id: '123' }),
      );

      userRepository.getUserByIdOrUsername.mockResolvedValue(
        createCompletedUserData({ userId: '456' }),
      );

      await expect(postService.updatePost(data, session)).rejects.toThrow(
        'User is not owner of the post.',
      );
    });
  });

  describe('deletePost', () => {
    it('Should throw exception when user from session has not been found', async () => {
      const id = '123';
      const session = createSessionMock();

      userRepository.getUserByIdOrUsername.mockResolvedValue(null);

      expect(postService.deletePost(id, session)).rejects.toThrow(
        'User not found.',
      );
    });

    it('Should throw exception when post has not been found', async () => {
      const id = '123';
      const session = createSessionMock();

      userRepository.getUserByIdOrUsername.mockResolvedValue(
        createCompletedUserData(),
      );

      expect(postService.deletePost(id, session)).rejects.toThrow(
        'Post not found.',
      );
    });

    it('Should create exception if post owner is diferrent from user', async () => {
      const id = '123';
      const session = createSessionMock();

      userRepository.getUserByIdOrUsername.mockResolvedValue(
        createCompletedUserData({ userId: '123' }),
      );

      postRepository.getPostDetails.mockResolvedValue(
        createPostRaw({ owner_id: '1234' }),
      );

      expect(postService.deletePost(id, session)).rejects.toThrow(
        'User is not owner of the post.',
      );
    });
  });
});
