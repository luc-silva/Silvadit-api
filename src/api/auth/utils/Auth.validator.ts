import { CreateUserDTO } from '../types/auth.dto';

export class AuthValidator {
  static checkEmail(email: string): asserts email is ValidatedUserEmail {
    if (!email.match(/^.*@.*\.com.*/)) {
      throw new Error('Invalid email pattern');
    }
  }

  static checkPasswords(data: CreateUserDTO) {
    if (data.password !== data.confirmPassword) {
      throw new Error('Invalid Password. Passwords are not equal.');
    }
  }
}
