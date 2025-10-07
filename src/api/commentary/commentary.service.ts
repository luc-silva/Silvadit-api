import { Inject, Injectable } from '@nestjs/common';
import {
  ReactCommentaryDataDTO,
  UpdateCommentaryDataDTO,
} from './types/commentary.dto';
import {
  COMMENTARY_REPOSITORY_TOKEN,
  CommentaryRepositoryBase,
} from './repository/commentary.repository.base';
import { CommentaryMapper } from './utils/commentary.mapper';

@Injectable()
export class CommentaryService {
  constructor(
    @Inject(COMMENTARY_REPOSITORY_TOKEN)
    private readonly commentaryRepository: CommentaryRepositoryBase,
  ) {}

  async updateCommentary(body: UpdateCommentaryDataDTO) {
    return await this.commentaryRepository.updateCommentary(body);
  }

  async deleteCommentary(id: string) {
    return await this.commentaryRepository.deleteCommentary(id as CommentaryID);
  }

  async reactCommentary(body: ReactCommentaryDataDTO) {
    const data: IReactCommentaryParams = {
      date_created: new Date(),
      reaction: ReactType.LIKE,
      target_id: body.target_id as CommentaryID,
      target_type: body.target_type,
    };
    return await this.commentaryRepository.reactCommentary(data);
  }

  async getReplies(commentaryId: string): Promise<ICommentaryOutput[]> {
    const commentary = await this.commentaryRepository.getCommentary(
      commentaryId as CommentaryID,
    );
    if (!commentary) {
      throw new Error('Commentary not found.');
    }

    const commentariesRaw = await this.commentaryRepository.getReplies(
      commentaryId as CommentaryID,
    );

    return CommentaryMapper.fromRaw(commentariesRaw);
  }
}
