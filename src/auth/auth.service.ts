import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up-dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private JWTService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;

    const existingUser = await this.userService.findOne(signUpDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await this.userService.create({ email, password: hashedPass });
    await user.save();
    return 'User Registered Successfully';
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const existingUser = await this.userService.findOne(email);
    if (!existingUser) {
      throw new BadRequestException('Invalid Credentials');
    }

    const isPassEqual = await bcrypt.compare(password, existingUser.password);
    if (!isPassEqual) {
      throw new BadRequestException('Invalid Credentials');
    }

    const JwtPayload = {
      email,
    };

    const accessToken = await this.JWTService.signAsync(JwtPayload);
    return { accessToken };
  }

  async getCurrentUser(email: string) {
    return this.userService.findOneByEmail(email);
  }
}
