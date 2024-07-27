import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsNotEmpty()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
    message: 'please enter valid email address',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password must be 8 charachters or longer',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'only latin charachters allowed',
  })
  password: string;
}
