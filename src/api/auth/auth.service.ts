import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import {
  ConcludeUserRegistrationDTO,
  PregistrerUserDTO,
  UpdatePreRegistrationUserDTO,
  UserLoginDTO,
} from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async login(data: UserLoginDTO) {
    return await this.userRepository.getUserData();
  }

  async validateUserEmail(data: PregistrerUserDTO) {
    const { email } = data;
    console.log(`a`);

    const isEmailAlreadyRegistered =
      await this.userRepository.checkIfEmailRegistred({ email });

    if (isEmailAlreadyRegistered) {
      throw new BadRequestException('Email já cadastrado.');
    }

    const preRegistrationData =
      await this.userRepository.getPreRegistrationUser({ email });

    if (preRegistrationData) {
      return preRegistrationData; 
    }

    return await this.userRepository.preRegisterUser(data);
  }

  async updateUser(data: UpdatePreRegistrationUserDTO) {
    return await this.userRepository.updatePreRegistrationUser(data);
  }

  async concludeUserRegistration({ email }: ConcludeUserRegistrationDTO) {
    const initialUserData = await this.userRepository.getPreRegistrationUser({
      email,
    });

    if (!initialUserData) {
      throw new BadRequestException(
        'Houve um erro ao cadastrar as informações.',
      );
    }

    await this.userRepository.createUser(initialUserData);

    await this.userRepository.removeUserFromPreRegistration({ email });
  }
}
