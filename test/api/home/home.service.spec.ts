import { Test, TestingModule } from '@nestjs/testing';
import { createFeedItem, createRawFeedItem } from 'test/mock/data/home';
import { createCompletedUserData } from 'test/mock/data/user';
import { MockPostRepository } from 'test/mock/repositories/post.repository';
import { MockUserRepository } from 'test/mock/repositories/user.repository';
import { HomeService } from '~/api/home/home.service';
import { HomepageMapper } from '~/api/home/utils/home.mapper';
import { POST_REPOSITORY_TOKEN } from '~/api/post/repository/post.repository.base';
import { CreatePostDTO } from '~/api/post/types/post.dto';
import { USER_REPOSITORY_TOKEN } from '~/api/user/repository/user.repository.token';

describe.skip('HomeService', () => {
  let homeService: HomeService;
  let postRepository: MockPostRepository;
  let userRepository: MockUserRepository;

  beforeEach(async () => {
    postRepository = new MockPostRepository();
    userRepository = new MockUserRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HomeService,
        {
          provide: POST_REPOSITORY_TOKEN,
          useValue: {},
        },
        { provide: USER_REPOSITORY_TOKEN, useValue: {} },
      ],
    })
      .overrideProvider(POST_REPOSITORY_TOKEN)
      .useValue(postRepository)
      .overrideProvider(USER_REPOSITORY_TOKEN)
      .useValue(userRepository)
      .compile();

    homeService = module.get<HomeService>(HomeService);
  });

  it("",() => {})
});
