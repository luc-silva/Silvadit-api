import { createGetPostDTO } from 'test/mock/data/post';
import { PostOrder } from '~/api/post/utils/post.order';

describe('PostOrder', () => {
  it('Should order correctly if no order specified', () => {
    const dtoMock = createGetPostDTO({
      orderDirection: undefined,
      orderField: undefined,
    });
    const expected = {
      column: 'P.DATE_CREATED',
      direction: 'ASC',
    };

    const result = PostOrder.toGetPosts(dtoMock);

    expect(result).toEqual(expected);
  });

  it('Should order date correctly', () => {
    const dtoMock = createGetPostDTO({
      orderDirection: 'desc',
      orderField: 'date',
    });

    const expected = {
      column: 'P.DATE_CREATED',
      direction: 'DESC',
    };

    const result = PostOrder.toGetPosts(dtoMock);

    expect(result).toEqual(expected);
  });

  it('Should order date correctly', () => {
    const dtoMock = createGetPostDTO({
      orderDirection: 'asc',
      orderField: 'date',
    });

    const expected = {
      column: 'P.DATE_CREATED',
      direction: 'ASC',
    };

    const result = PostOrder.toGetPosts(dtoMock);

    expect(result).toEqual(expected);
  });

  it('Should order content correctly', () => {
    const dtoMock = createGetPostDTO({
      orderDirection: 'asc',
      orderField: 'content',
    });

    const expected = {
      column: 'P.CONTENT',
      direction: 'ASC',
    };

    const result = PostOrder.toGetPosts(dtoMock);

    expect(result).toEqual(expected);
  });

  it('Should order content correctly', () => {
    const dtoMock = createGetPostDTO({
      orderDirection: 'asc',
      orderField: 'content',
    });

    const expected = {
      column: 'P.CONTENT',
      direction: 'ASC',
    };

    const result = PostOrder.toGetPosts(dtoMock);

    expect(result).toEqual(expected);
  });
});
