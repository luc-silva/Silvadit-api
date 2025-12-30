interface ISubscribeUserParams {
  is_admin: IYesNo;
  is_founder: IYesNo;
  user_id: string;
  forum_id: string;
}

interface IUnsubscribeUserParams {
  user_id: string;
  forum_id: string;
}

interface IGetForumMembersParams {
  forum_id: string;
  is_admin?: IYesNo;
  search?: string;
  page: number;
  items_per_page: number;
}

interface IGetForumMembersOrder {
  column: string;
  direction: 'ASC' | 'DESC';
}
