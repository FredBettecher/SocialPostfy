import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserDTO } from "../../dto/user.dto";
import { UserRepository } from "../user.repository";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findUser(email: string) {
    return await this.prisma.user.findUnique({ 
      where: {
        email: email
      },
    });
  }

  async createUser(data: UserDTO) {
    return await this.prisma.user.create({
      data: data,
    });
  }
}
