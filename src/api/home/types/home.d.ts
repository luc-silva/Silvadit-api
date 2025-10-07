//change to also include commentaries
type IFeedOutput = {
  postId: string;
  owner: {
    id: string;
    username: string;
  };
  forum: {
    name: string;
    id: string;
  } | null;
  content: string;
  title: string;
  isNsfw: boolean;
  dateCreated: Date;
  dateEdited: Date | null;
};

interface IRawBasicFeed {
  title: string;
  content: string;
  owner_id: string;
  owner_username: string;
  postId: string;
  isNsfw: string;
  dateCreated: Date;
  lastEdited: Date | null;
}

type IRawFeed = IRawBasicFeed &
  (
    | {
        forumId: null;
        forum_title: null;
      }
    | {
        forumId: string;
        forum_title: string;
      }
  );
