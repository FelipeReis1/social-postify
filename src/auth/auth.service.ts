import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthSigninDTO } from './dto/auth-signin.dto';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthSignupDTO } from './dto/auth-signup.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(authUserDto: AuthSignupDTO) {
    const user = await this.usersService.create(authUserDto);
    return this.createToken(user);
  }

  async signin({ email, password }: AuthSigninDTO) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) throw new UnauthorizedException('Email or password are invalid');
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
      throw new UnauthorizedException('Email or password are invalid');

    return this.createToken(user);
  }

  createToken(user: User) {
    const token = this.jwtService.sign(
      {
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '1 day',
        subject: String(user.id),
        issuer: 'Teste',
        audience: 'users',
      },
    );
    return { token };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: 'Teste',
        audience: 'users',
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
