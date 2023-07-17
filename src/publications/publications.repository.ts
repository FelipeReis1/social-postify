import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePublicationDTO } from './dto/publications.dto';
import { Publication } from '@prisma/client';

@Injectable()
export class PublicationsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createPublication(
    data: CreatePublicationDTO,
    userId: number,
  ): Promise<Publication> {
    return await this.prisma.publication.create({
      data: { ...data, userId },
    });
  }

  async findByTitle(title: string) {
    return await this.prisma.publication.findFirst({ where: { title } });
  }
}
