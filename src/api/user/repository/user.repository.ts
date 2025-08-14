import { Injectable } from '@nestjs/common';
import { getConnection } from 'src/db';
import { OUT_FORMAT_OBJECT } from 'oracledb';
import { UserQuery } from './user.query';
import { ICreateUserParams, IUpdateUserParams } from './user.interface';
import { UserRepositoryBase } from './user.repository.base';

@Injectable()
export class UserRepository implements UserRepositoryBase {
  async getUserFollowers(user_id: string) {
    const connection = await getConnection();
    const query = UserQuery.getUserFollowers();

    const { rows } = await connection.execute<IFollower>(
      query,
      { id: user_id },
      { outFormat: OUT_FORMAT_OBJECT },
    );
    return rows ? rows : [];
  }

  async getUserFollowingAccounts(id: UserID) {
    const connection = await getConnection();
    const query = UserQuery.getUserFollowedAccounts();

    const { rows } = await connection.execute<ISubscribedUser>(
      query,
      { id },
      { outFormat: OUT_FORMAT_OBJECT },
    );
    return rows ? rows : [];
  }

  async getUserFollowingForums(id: UserID) {
    const connection = await getConnection();
    const query = UserQuery.getUserFollowedAccounts();

    const { rows } = await connection.execute<IForumOutput>(
      query,
      { id },
      { outFormat: OUT_FORMAT_OBJECT },
    );
    return rows ? rows : [];
  }

  async getUserDetails(login: string) {
    const connection = await getConnection();
    const query = UserQuery.getUserByIdOrUsername();

    const { rows } = await connection.execute<IUserOutput>(
      query,
      { login },
      { outFormat: OUT_FORMAT_OBJECT },
    );
    return rows && rows.length ? rows[0] : null;
  }

  async getUserDataByEmail(email: ValidatedUserEmail) {
    const connection = await getConnection();

    const query = UserQuery.getUserByEmail();

    const { rows } = await connection.execute<ICompleteUser>(
      query,
      { email },
      { outFormat: OUT_FORMAT_OBJECT },
    );
    return rows && rows.length ? rows[0] : null;
  }

  async createUser(data: ICreateUserParams) {
    const connection = await getConnection();

    const binds = {
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      user_password: data.password,
      country: data.country,
      city: data.state,
      email: data.email,
      date_created: new Date(),
      user_id: '12312',
    };

    const query = UserQuery.createUser();

    await connection.execute(query, binds);
  }

  async checkIfEmailRegistered(email: ValidatedUserEmail) {
    const connection = await getConnection();

    const query = UserQuery.checkIfEmailRegistered();

    const { rows } = await connection.execute(
      query,
      { email },
      { outFormat: OUT_FORMAT_OBJECT },
    );
    return rows && rows.length ? (rows[0] as DatabaseValidated) : null;
  }

  async updateUser(data: IUpdateUserParams) {}

  async getUserPosts(id: UserID): Promise<IPost[]> {
    const connection = await getConnection();
    const query = UserQuery.getUserPosts();

    const { rows } = await connection.execute<IPost>(
      query,
      { id },
      { outFormat: OUT_FORMAT_OBJECT },
    );
    return rows ? rows : [];
  }

  async getUserByLogin(login: string): Promise<ICompleteUser | null> {
    const connection = await getConnection();
    const query = UserQuery.getUserByLoginMethod();

    const { rows } = await connection.execute<ICompleteUser>(
      query,
      { login },
      { outFormat: OUT_FORMAT_OBJECT },
    );
    return rows && rows.length ? rows[0] : null;
  }

  async getUserByIdOrUsername(login: string): Promise<ICompleteUser | null> {
    const connection = await getConnection();
    const query = UserQuery.getUserByIdOrUsername();

    const { rows } = await connection.execute<ICompleteUser>(
      query,
      { login },
      { outFormat: OUT_FORMAT_OBJECT },
    );
    return rows && rows.length ? rows[0] : null;
  }

  async getUserFeed(id: UserID): Promise<IRawFeed[]> {
    const connection = await getConnection();
    const query = UserQuery.getUserFeed();

    const { rows } = await connection.execute<IRawFeed>(
      query,
      { id },
      { outFormat: OUT_FORMAT_OBJECT },
    );
    return rows ? rows : [];
  }
}
