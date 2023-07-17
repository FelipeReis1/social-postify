import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { AuthGuard } from 'src/auth/authGuard/auth.guard';
import { CreatePublicationDTO } from './dto/publications.dto';
import { UserRequest } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createPublication(
    @Body() createPublicationDto: CreatePublicationDTO,
    @UserRequest() user: User,
  ) {
    return this.publicationsService.createPublication(
      createPublicationDto,
      user.id,
    );
  }
}
