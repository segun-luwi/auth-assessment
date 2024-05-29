import { IsString, IsEmail, Matches, MinLength } from 'class-validator';
import { Match } from '../../decorators/match-password.decorator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly username: string;

  @Matches(/^[A-Za-z\d@$!%*?&]{8,}/, {
    message: 'Password must be at least 8 characters'
  })
  @Matches(/^(?=.*[@$!%*?&])/, {
    message: 'Password must contain at least one symbol'
  })
  @Matches(/^(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter'
  })
  @Matches(/^(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter'
  })
  @Matches(/^(?=.*\d)/, {
    message: 'Password must contain at least a number'
  })
  password: string;

  @IsString()
  @MinLength(8)
  @Match('password', { message: 'password confirmation does not match' })
  passwordConfirm: string;
}
