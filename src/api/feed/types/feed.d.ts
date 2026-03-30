interface IGetFeedParams {
  type?: 'post' | 'user' | 'forum' | 'all';
  page: number;
  items_per_page: number;
}

interface IGetFeedOrder {
  orderField?: string;
  orderDirection?: string;
}

interface IRawFeedData {
  user_id: string;
  user_username: string;
  user_first_name: string;
  user_last_name: string;
  user_user_description: string;
  forum_forum_id: string;
  forum_forum_name: string;
  
}
