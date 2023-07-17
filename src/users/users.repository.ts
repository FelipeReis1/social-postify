import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateUserDto) {
    await this.prisma.user.create({ data: data });
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }
}
