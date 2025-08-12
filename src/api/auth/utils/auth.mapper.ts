import {
  ICreateUserParams,
  IUpdateUserParams,
} from '~/api/user/repository/user.interface';
import { CreateUserDTO, UpdateUserDTO } from '../types/auth.dto';

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

  static toUpdate(data: UpdateUserDTO): IUpdateUserParams {
    return {
      country: data.country,
      description: data.description,
      first_name: data.firstName,
      last_name: data.lastName,
      state: data.state,
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
