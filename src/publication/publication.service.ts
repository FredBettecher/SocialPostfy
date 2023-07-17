import { ConflictException, Injectable } from '@nestjs/common';
import { PublicationRepository } from './repository/publication.repository';
import { PublicationDTO } from './dto/publication.dto';
@Injectable()
export class PublicationService {
  constructor(private readonly publicationRepository: PublicationRepository) {}

  async createPublication(userId: string, data: PublicationDTO) {
    const userPublications = await this.publicationRepository.findPublications(userId);
    const isTitleInUse = userPublications.filter(publication => publication.title === data.title);
    if(isTitleInUse.length !== 0) throw new ConflictException('Title already in use');

    const publicationData = { ...data, userId: userId };
    const publication = this.publicationRepository.createPublication(publicationData);
    return publication;
  }

  async findPublications(userId: string) {
    const publications = await this.publicationRepository.findPublications(userId);
    const formatedPublications = publications.map(publication => {
      const { id, userId, ...publicationsWithoutIds } = publication;
      return publicationsWithoutIds;
    })
    
    return formatedPublications;
  }
}
