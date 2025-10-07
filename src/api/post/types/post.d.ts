interface IGetPostDetails {
  post_id: string;
}

type PostID = Branded<string, 'postId'>;

interface IPostRaw {
  post_id: string;
  post_content: string;
  post_title: string;
  post_is_nsfw: boolean;
  post_date_created: Date;
  post_date_edited: Date;
  post_comentaries: number;
  post_likes: number;
  owner_id: string;
  owner_username: string;
  owner_followers: number;
  forum_id: string | null;
  forum_name: string | null;
  forum_description: string | null;
  forum_followers: number;
}

interface IPostOutput {
  owner: {
    id: string;
    username: string;
    avatar?: string;
    banner?: string;
    followers: number;
  };
  forum: {
    name: string;
    id: string;
    description: string;
    avatar?: string;
    banner?: string;
    followers: number;
  } | null;
  post: {
    id: string;
    content: string;
    title: string;
    isNsfw: boolean;
    dateCreated: Date;
    dateEdited: Date | null;
    likes: number;
    comentaries: number;
    images?: string[];
  };
}
