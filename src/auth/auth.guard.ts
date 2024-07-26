import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = getTokenFromHeaders(request);
    if (!token) {
      throw new BadRequestException('Invalid Token');
    }

    try {
      const user = await this.jwtService.verifyAsync(token);
      request.user = {
        email: user.email,
        id: user.id,
      };
    } catch (error) {
      throw new BadRequestException('Invalid Token');
    }

    return true;
  }
}

function getTokenFromHeaders(req) {
  if (!req.headers['authorization']) return null;
  const token = req.headers['authorization'].split(' ')[1];
  return token;
}
