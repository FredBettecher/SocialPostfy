import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PublicationRepository } from "../publication.repository";
import { PublicationDTO } from "src/publication/dto/publication.dto";

@Injectable()
export class PrismaPublicationRepository implements PublicationRepository {
  constructor(private prisma: PrismaService) {}

  async createPublication(data: PublicationDTO) {
    return await this.prisma.publication.create({
      data: data,
    });
  }

  async findPublications(userId: string) {
    return await this.prisma.publication.findMany({
      where: {
        userId: userId,
      },
    });
  }
}
