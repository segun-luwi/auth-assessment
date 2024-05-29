import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  readonly username: string;

  @MinLength(8)
  password: string;
}
