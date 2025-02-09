import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async createUser() {
    return '';
  }

  async login(data: ILoginData) {}
}
