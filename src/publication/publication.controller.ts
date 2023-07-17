import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { PublicationDTO } from './dto/publication.dto';
import { UserRequest } from 'src/auth/decorator/user.decorator';
import { User } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller()
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post('publication')
  async postPublication(@UserRequest() user: User, @Body() body: PublicationDTO) {
    const publication = await this.publicationService.createPublication(user.id, body);
    return publication;
  }

  @Get('publications')
  async getPublications(@UserRequest() user: User) {
    const publications = await this.publicationService.findPublications(user.id);
    return publications;
  }
}
