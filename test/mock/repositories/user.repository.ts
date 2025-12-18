import {
  ICreateUserParams,
  IUpdateUserDetailsParams,
} from 'src/api/user/repository/user.interface';
import { UserRepositoryBase } from 'src/api/user/repository/user.repository.base';

export class MockUserRepository implements jest.Mocked<UserRepositoryBase> {
  getUserFollowers = jest.fn<Promise<IFollower[]>, [UserID]>();

  getUserFollowingAccounts = jest.fn<Promise<ISubscribedUser[]>, [UserID]>();

  getUserFollowingForums = jest.fn<Promise<IForumRaw[]>, [UserID]>();

  getUserDetails = jest.fn<Promise<IUserOutput | null>, [string]>();

  getUserDataByEmail = jest.fn<
    Promise<ICompleteUser | null>,
    [ValidatedUserEmail]
  >();

  getUserPosts = jest.fn<Promise<IPostRaw[]>, [UserID]>();

  createUser = jest.fn<Promise<void>, [ICreateUserParams]>();

  checkIfEmailRegistered = jest.fn<
    Promise<DatabaseValidated | null>,
    [ValidatedUserEmail]
  >();

  updateUserDetails = jest.fn<Promise<void>, [IUpdateUserDetailsParams]>();

  updateUserEmail = jest.fn<Promise<void>, [IUpdateUserEmailParams]>();

  updateUserLocation = jest.fn<Promise<void>, [IUpdateUserDetailsParams]>();

  getUserByLogin = jest.fn<Promise<ICompleteUser | null>, [string]>();

  getUserByIdOrUsername = jest.fn<Promise<ICompleteUser | null>, [string]>();

  getUserFeed = jest.fn<Promise<IRawFeed[]>, [UserID]>();
}
