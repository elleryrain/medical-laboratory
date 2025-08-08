import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const { email, middleName, name, password, role, surname, avatar } = body;
    const hashedPassword = this.authService.hashPassword(password);
    const newUserData = {
      hashedPassword,
      email,
      middleName,
      name,
      role,
      surname,
      avatar,
    };
    const user = await this.userService.create(newUserData);
    return user;
  }

  @Post('login')
  async loginHandler(@Body() body: LoginUserDto) {
    const { email, password } = body;

    const token = await this.authService.login(email, password);
    return { accessToken: token };
  }
}
