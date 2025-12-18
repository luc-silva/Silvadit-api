import { ICreateUserParams, IUpdateUserDetailsParams, IUpdateUserLocationParams } from './user.interface';

export interface UserRepositoryBase {
  getUserFollowingAccounts(id: UserID): Promise<ISubscribedUser[]>;

  getUserFollowingForums(id: UserID): Promise<IForumRaw[]>;

  getUserDetails(login: string): Promise<IUserOutput | null>;

  getUserDataByEmail(email: ValidatedUserEmail): Promise<ICompleteUser | null>;

  getUserPosts(id: UserID): Promise<IPostRaw[]>;

  getUserFeed(id: UserID): Promise<IRawFeed[]>;

  createUser(data: ICreateUserParams): Promise<void>;

  checkIfEmailRegistered(
    email: ValidatedUserEmail,
  ): Promise<DatabaseValidated | null>;

  updateUserDetails(data: IUpdateUserDetailsParams): Promise<void>;

  updateUserLocation(data: IUpdateUserLocationParams): Promise<void>;

  updateUserEmail(data: IUpdateUserEmailParams): Promise<void>;

  getUserByLogin(login: string): Promise<ICompleteUser | null>;

  getUserByIdOrUsername(login: string): Promise<ICompleteUser | null>;

  getUserFollowers(user_id: UserID): Promise<IFollower[]>;
}
