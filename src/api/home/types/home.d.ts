//change to also include commentaries
type IFeedOutput = IPostOutput;

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
