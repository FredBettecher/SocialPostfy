import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  createUser(@Body() body: UserDTO) {
    return this.userService.createUser(body);
  }
}
