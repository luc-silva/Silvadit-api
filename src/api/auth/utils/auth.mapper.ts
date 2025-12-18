import {
  ICreateUserParams,
  IUpdateUserDetailsParams,
} from '~/api/user/repository/user.interface';
import { CreateUserDTO, UpdateUserEmailDTO } from '../types/auth.dto';
import { UpdateUserDetailsDTO } from '~/api/user/types/user.dto';

export class AuthMapper {
  static toSession(user: ICompleteUser): ISession {
    return {
      date_issued: new Date(),
      email: user.email,
      id: user.userId,
    };
  }

  static toLoginDetails(user: ICompleteUser, token: string): ILoginDetails {
    return {
      id: user.userId,
      token,
    };
  }

  static toUpdateUserEmail(data: UpdateUserEmailDTO): IUpdateUserEmailParams {
    return {
      email: data.email,
      newEmail: data.newEmail,
    };
  }

  static toCreate(data: CreateUserDTO): ICreateUserParams {
    return {
      country: data.country,
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
      state: data.state,
      username: data.username,
      description: data.description,
    };
  }
}
