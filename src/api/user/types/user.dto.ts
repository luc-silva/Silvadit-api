import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDetailsDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  username: string;
}

export class UpdateUserLocationDTO {
  @IsString()
  state: string;

  @IsString()
  country: string;
}
