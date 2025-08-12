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
  });

  describe.skip('POST', () => {
    expect(1).toBe(1);
    // it('createPost - should create exception if user is invalid', async () => {
    //   const data: CreatePostDTO = {
    //     content: 'string',
    //     isNsfw: 'N',
    //     title: 'Teste',
    //   };
    //   await expect(postService.createPost(data)).rejects.toThrow(
    //     'User not found.',
    //   );
    // });
    // it('createPost - should invalidate invalid data', async () => {
    //   const data = {
    //     content: null,
    //     title: null,
    //     user_id: 'E8C6B684C8DD4EC582F6AA82CDC76908',
    //   };
    //   userRepository.getUserByIdOrUsername.mockResolvedValue(createCompletedUserData())
    //   await expect(postService.createPost(data as unknown as CreatePostDTO)).rejects.toThrow(
    //     'Invalid data.',
    //   );
    // });
  });
});
