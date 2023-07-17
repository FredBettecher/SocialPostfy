import { Publication } from "@prisma/client";
import { PublicationDTO } from "../dto/publication.dto";

export abstract class PublicationRepository {
  abstract createPublication(data: PublicationDTO): Promise<Publication>;
  abstract findPublications(userId: string): Promise<Publication[]>;
}
