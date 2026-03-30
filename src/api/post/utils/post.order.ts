import { GetPostsDTO } from '../types/post.dto';

export class PostOrder {
  static toGetPosts(dto: GetPostsDTO): IOrder {
    if (dto.orderField === 'date') {

      return {
        column: 'P.DATE_CREATED',
        direction: dto.orderDirection === 'desc' ? 'DESC' : 'ASC',
      };
    }
    
    if (dto.orderField === 'content') {
      return {
        column: 'P.CONTENT',
        direction: dto.orderDirection === 'desc' ? 'DESC' : 'ASC',
      };
    }

    return {
      column: 'P.DATE_CREATED',
      direction: 'ASC',
    };
  }
}
