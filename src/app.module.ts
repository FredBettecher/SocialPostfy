import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PublicationModule } from './publication/publication.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, PublicationModule, PrismaModule],
})
export class AppModule {}
