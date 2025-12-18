import { IUpdateUserDetailsParams } from '../repository/user.interface';
import { UpdateUserDetailsDTO } from '../types/user.dto';

export class UserMapper {
  static toUpdateDetailsParams(
    data: UpdateUserDetailsDTO,
    user: ICompleteUser
  ): IUpdateUserDetailsParams {
    return {
      first_name: data.firstName,
      last_name: data.lastName,
      username: data.username,
      description: data.description ? data.description : null,
      user_id: user. userId
    };
  }
}
