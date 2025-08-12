import { Injectable } from '@nestjs/common';
import { FollowerRepositoryBase } from './followers.repository.base';
import { getConnection } from '~/db';
import { FollowersQuery } from './followers.query';

@Injectable()
export class FollowerRepository implements FollowerRepositoryBase {
  async follow(): Promise<void> {
    const connection = await getConnection();
    const query = FollowersQuery.follow();

    await connection.execute(query, {});
  }

  async unfollow(): Promise<void> {
    const connection = await getConnection();
    const query = FollowersQuery.unfollow();

    await connection.execute(query, {});
  }
}
