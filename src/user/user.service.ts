import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserModel } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { UserDto } from './dto/user.dto';
import { USER_NOT_FOUND_ERROR } from './user.constants';
import { AuthDto } from './../auth/dto/auth.dto';
import { WRONG_PASSWORD_ERROR } from './../auth/auth.constants';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {}

  async createUser(dto: UserDto): Promise<UserModel> {
    const salt = await genSalt(10);

    const newUser = await this.userModel.create({
      email: dto.email,
      passwordHash: await hash(dto.password, salt),
    });
    return newUser.save();
  }

  async findUser(email: string): Promise<UserModel> {
    const finedUser = await this.userModel.findOne({ email }).exec();
    return finedUser;
  }

  async validateUser({
    login,
    password,
  }: AuthDto): Promise<Pick<UserModel, 'email'>> {
    const user = await this.userModel.findOne({ email: login }).exec();

    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }

    const isCorrectPassword = await compare(password, user.passwordHash);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }

    return {
      email: user.email,
    };
  }
}
