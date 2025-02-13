import { IsOptional, IsString } from 'class-validator';

export class UserLoginDTO {
  @IsString()
  access: string;

  @IsString()
  password: string;
}

export class PregistrerUserDTO {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class UpdatePreRegistrationUserDTO {
  @IsString()
  email: string;

  @IsString()
  old_email: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;
}

export class ConcludeUserRegistrationDTO {
  @IsString()
  email: string;
}
