import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/repository/user.repository';
import { PrismaUserRepository } from 'src/user/repository/implementation/prismaUser.repository';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET })],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    }
  ]
})
export class AuthModule {}
