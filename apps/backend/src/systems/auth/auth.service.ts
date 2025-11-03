import { ForbiddenException, Injectable } from '@nestjs/common';
import crypto from 'node:crypto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
    return `${salt}:${hash}`;
  }

  async validatePassword(
    storedPassword: string,
    providedPassword: string,
  ): Promise<boolean> {
    const [salt, storedHash] = storedPassword.split(':');
    const hash = crypto
      .pbkdf2Sync(providedPassword, salt, 1000, 64, 'sha512')
      .toString('hex');
    return storedHash === hash;
  }
  async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    console.log(user);
    const isPasswordValid = await this.validatePassword(
      user.hashedPassword,
      password,
    );
    if (!isPasswordValid) {
      throw new ForbiddenException();
    }
    const payload = { id: user.id };
    const token = this.jwtService.sign(payload);
    console.log(token);
    console.log(this.jwtService.verify(token));

    return token;
  }
}
