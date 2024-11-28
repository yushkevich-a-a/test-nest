import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { TopPageModel } from './top-page.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@Injectable()
export class TopPageService {
  constructor(@InjectModel(TopPageModel.name) private readonly topPageModel: Model<TopPageModel>) { }

  async create(dto: CreateTopPageDto) {
    const createTopPage = new this.topPageModel(dto);
    return createTopPage.save();
  }

  async findByAlias(alias: string) {
    return this.topPageModel.find({ alias: alias }).exec();
  }

  async updateTopPage(id: string, dto: CreateTopPageDto) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true })
  }

  async delete(id: string) {
    return this.topPageModel.findByIdAndDelete(id).exec()
  }
}
