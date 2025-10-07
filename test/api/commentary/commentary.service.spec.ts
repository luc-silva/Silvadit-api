import { Test, TestingModule } from '@nestjs/testing';
import {
  createCommentaryOutputMock,
  createCommentaryParamsMock,
  createPostCommentaryDTO,
  createRawCommentaryMock,
} from 'test/mock/data/commentary';
import { createCompletedUserData } from 'test/mock/data/user';
import { MockCommentaryRepository } from 'test/mock/repositories/commentary.repository';
import { CommentaryService } from '~/api/commentary/commentary.service';
import { COMMENTARY_REPOSITORY_TOKEN } from '~/api/commentary/repository/commentary.repository.base';
import { CommentaryMapper } from '~/api/commentary/utils/commentary.mapper';

describe('CommentaryService', () => {
  let commentaryService: CommentaryService;
  let commentaryRepository: MockCommentaryRepository;

  beforeEach(async () => {
    commentaryRepository = new MockCommentaryRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentaryService,
        {
          provide: COMMENTARY_REPOSITORY_TOKEN,
          useValue: {},
        },
      ],
    })
      .overrideProvider(COMMENTARY_REPOSITORY_TOKEN)
      .useValue(commentaryRepository)
      .compile();

    commentaryService = module.get<CommentaryService>(CommentaryService);
  });

  describe('Mapper', () => {
    describe('fromRaw', () => {
      it('Should map array of raw commentaries correctly', () => {
        const expected = [createCommentaryOutputMock()];

        const result = CommentaryMapper.fromRaw([createRawCommentaryMock()]);

        expect(result).toEqual(expected);
      });
    });

    describe('createCommentary', () => {
      it('Should map DTO and User to db params correctly', () => {
        const expected = createCommentaryParamsMock({ userId: '123' });

        const result = CommentaryMapper.createCommentary(
          createPostCommentaryDTO(),
          createCompletedUserData({ userId: '123' }),
        );

        expect(result).toEqual(expected);
      });
    });
  });

  describe('GET', () => {
    describe('getReplies', () => {
      it('Should throw exception if commentary has not been found', async () => {
        const commentaryId = '123';
        await expect(
          commentaryService.getReplies(commentaryId),
        ).rejects.toThrow('Commentary not found.');
      });

      it('Should list commentaries correctly', async () => {
        const commentaryId = '123';
        const expected = [createCommentaryOutputMock({ replyId: '123' })];

        commentaryRepository.getCommentary.mockResolvedValue(
          createRawCommentaryMock({ id: '123' }),
        );
        commentaryRepository.getReplies.mockResolvedValue([
          createRawCommentaryMock({ replyId: '123' }),
        ]);

        const result = await commentaryService.getReplies(commentaryId);
        expect(result).toEqual(expected);
      });
    });
  });
});
