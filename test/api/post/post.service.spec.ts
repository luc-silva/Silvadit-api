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

  describe('POST', () => {
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
        await expect(
          commentaryRepository.createCommentary,
        ).toHaveBeenCalledWith(expectCalledWith);
      });
    });
  });
});
