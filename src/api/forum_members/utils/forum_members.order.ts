import { GetForumMemberFilterDTO } from '~/api/forum/types/forum.dto';

export class ForumMembersOrder {
  static toMembersFiltersOrder(
    dto: GetForumMemberFilterDTO,
  ): IGetForumMembersOrder {
    if (dto.orderField === 'name') {
      return {
        column: "UA.FIRST_NAME || '' || UA.LAST_NAME",
        direction: dto.orderDirection === 'desc' ? 'DESC' : 'ASC',
      };
    }

    if (dto.orderField === 'date') {
      return {
        column: "UA.DATE_CREATED",
        direction: dto.orderDirection === 'desc' ? 'DESC' : 'ASC',
      };
    }

    return {
      column: "UA.FIRST_NAME || '' || UA.LAST_NAME",
      direction: dto.orderDirection === 'desc' ? 'DESC' : 'ASC',
    };
  }
}
