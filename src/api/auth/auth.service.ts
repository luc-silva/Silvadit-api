import { Inject, Injectable } from '@nestjs/common';
import {
  CreateUserDTO,
  UpdateUserEmailDTO,
  UserLoginDTO,
} from './types/auth.dto';
import { ICreateUserParams } from '../user/repository/user.interface';
import { UserRepositoryBase } from '../user/repository/user.repository.base';
import { AuthValidator } from './utils/Auth.validator';
import { USER_REPOSITORY_TOKEN } from '../user/repository/user.repository.token';
import { JWTEncrypter } from '~/utils/Encrypter';
import { AuthMapper } from './utils/auth.mapper';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepositoryBase,
  ) {}
  async login(data: UserLoginDTO): Promise<ILoginDetails> {
    const found = await this.userRepository.getUserByLogin(data.login);

    if (!found) {
      throw new Error(
        'There is no account registered with that email or username',
      );
    }

    if (!found) throw new Error('User not found');

    if (found.password !== data.password) throw new Error('Invalid password');

    const session = AuthMapper.toSession(found);
    const token = JWTEncrypter.encode<ISession>(session);

    return AuthMapper.toLoginDetails(found, token);
  }

  async updateUserEmail(data: UpdateUserEmailDTO, session: ISession) {
    AuthValidator.checkEmail(data.newEmail);

    const user = this.userRepository.getUserByIdOrUsername(session.id);
    if (!user) {
      throw new Error('User not found.');
    }

    const alreadyRegistered = await this.userRepository.getUserDataByEmail(
      data.newEmail,
    );
    if (alreadyRegistered) {
      throw new Error('There is already an account using this email');
    }

    const binds: IUpdateUserEmailParams = AuthMapper.toUpdateUserEmail(data);

    return await this.userRepository.updateUserEmail(binds);
  }

  async createUser(data: CreateUserDTO) {
    AuthValidator.checkEmail(data.email);

    const foundEmail = await this.userRepository.getUserByLogin(data.email);
    if (foundEmail) {
      throw new Error('There is already an account using this email');
    }

    const foundUsername = await this.userRepository.getUserByLogin(
      data.username,
    );
    if (foundUsername) {
      throw new Error('There is already an account using this username');
    }

    AuthValidator.checkPasswords(data);

    //mapear
    const params: ICreateUserParams = {
      country: data.country,
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password, //criptografar
      state: data.state,
      username: data.username,
      email: data.email,
    };

    await this.userRepository.createUser(params);
  }
}
