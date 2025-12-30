import { ForumMembersMapper } from '~/api/forum_members/utils/forum_members.mapper';
import { ForumMapper } from './forum.mapper';

export class ForumAssembler {
  static toForum(forum: IForumRaw, staff: IForumMemberRaw[]): IForum {
    const mappedStaff = staff.map(ForumMembersMapper.toForumMembersOutput);
    const mappedForum = ForumMapper.toForumOutput(forum);

    return { forum: mappedForum, staff: mappedStaff };
  }
}
