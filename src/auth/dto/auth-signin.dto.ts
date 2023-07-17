import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthSigninDTO {
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
