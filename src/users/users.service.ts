import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(data: CreateUserDto) {
    const hashedPassword = bcrypt.hashSync(data.password, 10);
    const userExists = await this.usersRepository.findUserByEmail(data.email);
    if (userExists)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    return await this.usersRepository.create({
      ...data,
      password: hashedPassword,
    });
  }
}
