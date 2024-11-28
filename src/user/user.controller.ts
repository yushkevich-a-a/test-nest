import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { USER_REGISTER_ERROR } from './user.constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: UserDto) {
    const oldUser = await this.userService.findUser(dto.email);

    if (oldUser) {
      throw new BadRequestException(USER_REGISTER_ERROR);
    }

    return this.userService.createUser(dto);
  }

  // @Delete()
  // async userDelete() {}
}
