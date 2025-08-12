import { IsOptional, isString, IsString } from 'class-validator';

export class UserLoginDTO {
  @IsString()
  login: string;

  @IsString()
  password: string;
}

export class CreateUserDTO {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;

  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  country: string;

  @IsString()
  state: string;

  @IsString()
  @IsOptional()
  description: string;
}

export class UpdateUserDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  country: string;

  @IsString()
  state: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  email: string;

  @IsString()
  newEmail: string;
}
