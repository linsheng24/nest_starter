import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user && user.encodePassword == password) {
      const { encodePassword, ...result } = user;
      return result;
    } else {
      return null;
    }
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      photos: user.photos,
      sub: user.userId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
