import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaUserRepository } from './repository/implementation/prismaUser.repository';
import { UserRepository } from './repository/user.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
  {
    provide: UserRepository,
    useClass: PrismaUserRepository,
  }],
  exports: [
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    }],
})
export class UserModule {}
