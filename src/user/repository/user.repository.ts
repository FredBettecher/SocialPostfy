import { User } from "@prisma/client";
import { UserDTO } from "../dto/user.dto";

export abstract class UserRepository {
  abstract findUser(email: string): Promise<User>;
  abstract createUser(data: UserDTO): Promise<User>;
  abstract findUserById(id: string): Promise<User>;
}
