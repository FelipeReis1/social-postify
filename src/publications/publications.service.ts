import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePublicationDTO } from './dto/publications.dto';
import { Publication } from '@prisma/client';
import { PublicationsRepository } from './publications.repository';

@Injectable()
export class PublicationsService {
  constructor(
    private readonly publicationsRepository: PublicationsRepository,
  ) {}
  async createPublication(
    data: CreatePublicationDTO,
    userId: number,
  ): Promise<Publication> {
    const postExists = await this.publicationsRepository.findByTitle(
      data.title,
    );
    if (postExists)
      throw new ConflictException('This title is already in use!');
    return await this.publicationsRepository.createPublication(data, userId);
  }

  async getPublication(userId: number) {
    return await this.publicationsRepository.getPublication(userId);
  }
}
