import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { SignInDTO } from './dto/signin.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUser(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async createUser(data: UserDTO) {
    const emailInUse = await this.findUser(data.email);
    if(emailInUse) throw new HttpException('Email already in use', HttpStatus.CONFLICT);

    return await this.prisma.user.create({
      data: data,
    });
  }
  
  // createUser({ name, email, password, avatar }: UserDTO) {
  //   const emailInUse = this.users.find(item => item.email === email);
  //   if(emailInUse) throw new HttpException('Email already in use', HttpStatus.CONFLICT);

  //   const user = new User(name, email, password, avatar);
    
  //   return this.users.push(user); 
  // }

  // signIn({ email, password }: SignInDTO) {
  //   const checkEmail = this.users.find(item => item.email === email);
  //   const checkPassword = this.users.find(item => item.password === password);
  //   if(!checkEmail || !checkPassword) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  // }
}
