import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDTO } from './dto/signIn.dto';
import { SignUpDTO } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/repository/user.repository';

@Injectable()
export class AuthService {
  private EXPIRATION_TIME = '7 days';
  private ISSUER = 'Social Postfy';
  private AUDIENCE = 'user';

  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
    ) {}

  async signIn({ email, password }: SignInDTO) {
    const user = await this.userService.findUser(email);
    if(!user) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    const validPassword = bcrypt.compareSync(password, user.password);
    if(!validPassword) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    return this.createToken(user);
  }

  async signUp(body: SignUpDTO) {
    const emailInUse = await this.userRepository.findUser(body.email);
    if(emailInUse) throw new HttpException('E-mail already in use', HttpStatus.CONFLICT);

    const user = await this.userService.createUser(body);
    return this.createToken(user);
  }
  
  createToken(user: User) {
    const token = this.jwtService.sign({
      name: user.name,
      email: user.email
    }, {
      expiresIn: this.EXPIRATION_TIME,
      subject: user.id,
      issuer: this.ISSUER,
      audience: this.AUDIENCE
    });

    return { acessToken: token };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token , {
        issuer: this.ISSUER,
        audience: this.AUDIENCE
      });

      return data;
    } catch(error) {
      return new BadRequestException(error);
    }
  }
}
