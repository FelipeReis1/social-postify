import { Module } from '@nestjs/common';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';
import { PublicationsRepository } from './publications.repository';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, JwtModule.register({ secret: process.env.JWT_SECRET })],
  controllers: [PublicationsController],
  providers: [
    PublicationsService,
    AuthService,
    UsersService,
    {
      provide: UsersRepository,
      useClass: UsersRepository,
    },
    PublicationsService,
    {
      provide: PublicationsRepository,
      useClass: PublicationsRepository,
    },
  ],
})
export class PublicationsModule {}
