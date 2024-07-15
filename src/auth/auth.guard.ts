import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getTokenFromHeaders(request);
    if (!token) {
      throw new BadRequestException('Invalid Token');
    }

    try {
      const user = await this.jwtService.verifyAsync(token);
      request.user = user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Invalid Token');
    }

    return true;
  }

  getTokenFromHeaders(req: Request): string | null {
    if (!req.headers.authorization) return null;
    const [type, token] = req.headers.authorization.split(' ');
    return type === 'Bearer' ? token : null;
  }
}
