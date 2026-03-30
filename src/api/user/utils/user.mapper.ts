import {
  IUpdateUserDetailsParams,
  IUpdateUserLocationParams,
} from '../repository/user.interface';
import { UpdateUserDetailsDTO, UpdateUserLocationDTO } from '../types/user.dto';

export class UserMapper {
  static toUpdateDetailsParams(
    data: UpdateUserDetailsDTO,
    user: ICompleteUser,
  ): IUpdateUserDetailsParams {
    return {
      first_name: data.firstName,
      last_name: data.lastName,
      username: data.username,
      description: data.description ? data.description : null,
      id: user.userId,
    };
  }

  static toUpdateLocationParams(
    data: UpdateUserLocationDTO,
    user: ICompleteUser,
  ): IUpdateUserLocationParams {
    return {
      country: data.country,
      state: data.state,
      user_id: user.userId,
    };
  }

  static toUser(data: IUserDetailsRaw): IUserDetailsOutput {
    return {
      country: data.country,
      dateCreated: data.date_created,
      email: data.email,
      firstName: data.first_name,
      followersTotal: data.followers_total,
      followingTotal: data.following_total,
      id: data.id,
      isBanned: data.is_banned,
      lastName: data.last_name,
      state: data.state,
      username: data.username,
    };
  }
}
