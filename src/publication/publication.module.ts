import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PrismaPublicationRepository } from './repository/implementation/prismaPublication.repository';
import { PublicationRepository } from './repository/publication.repository';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, AuthModule, JwtModule.register({secret: process.env.JWT_SECRET})],
  controllers: [PublicationController],
  providers: [
    PublicationService,
    AuthService,
    UserService,
    {
      provide: PublicationRepository,
      useClass: PrismaPublicationRepository,
    }
  ]
})
export class PublicationModule {}
