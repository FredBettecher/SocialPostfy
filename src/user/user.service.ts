import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUser(email: string) {
    const user = await this.userRepository.findUser(email);
    if(!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async createUser(data: UserDTO) {
    const emailInUse = await this.userRepository.findUser(data.email);
    if(emailInUse) throw new HttpException('Email already in use', HttpStatus.CONFLICT);

    const hashPassword = bcrypt.hashSync(data.password, 10);
    await this.userRepository.createUser({ ...data, password: hashPassword });
  }
}
