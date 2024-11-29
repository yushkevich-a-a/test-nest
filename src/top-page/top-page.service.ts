import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { TopPageModel } from './top-page.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopLevelCategoryEnum } from './dto/top-level-category.constants';
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
    return this.topPageModel.find(firstLevel, { alias: 1, title: 1 }).exec();
  }

  async updateTopPage(id: string, dto: CreateTopPageDto) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string) {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }
}
