import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {}

  async createUser(dto: AuthDto): Promise<UserModel> {
    const salt = genSaltSync(10);

    const newUser = await this.userModel.create({
      email: dto.login,
      passwordHash: hashSync(dto.password, salt),
    });
    return newUser.save();
  }

  async findUser(email: string): Promise<UserModel> {
    const finedUser = await this.userModel.findOne({ email }).exec();
    return finedUser;
  }
}
