import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { TopPageModel } from './top-page.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.gto';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel.name)
    private readonly topPageModel: Model<TopPageModel>,
  ) {}

  async create(dto: CreateTopPageDto) {
    const createTopPage = new this.topPageModel(dto);
    return createTopPage.save();
  }

  async findAll() {
    return this.topPageModel.find({}).exec();
  }

  async findById(id: string) {
    return this.topPageModel.findById(id).exec();
  }

  async findByAlias(alias: string) {
    return this.topPageModel.find({ alias: alias }).exec();
  }

  async findBySearchText(text: string) {
    return this.topPageModel
      .find({ $text: { $search: text, $caseSensitive: false } })
      .exec();
  }

  async findByCategory(firstLevel: FindTopPageDto) {
    return this.topPageModel
      .aggregate()
      .match(firstLevel)
      .group({
        _id: { secondCategory: '$secondLevel' },
        pages: {
          $push: { alias: '$alias', title: '$title' },
        },
      })
      .exec();
  }

  async updateTopPage(id: string, dto: CreateTopPageDto) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string) {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }
}
