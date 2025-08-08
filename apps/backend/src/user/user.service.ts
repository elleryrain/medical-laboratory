import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../auth/dto/user.dto';
import { usersTable } from '../drizzle/schemas/schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(userData: typeof usersTable.$inferInsert) {
    console.log(userData);
    const newUser = await this.userRepository.create(userData);
    console.log(newUser);
    return newUser;
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }
}
