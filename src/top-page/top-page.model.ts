import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TopPageDocument = HydratedDocument<TopPageModel>;

export enum TopLevelCategory {
  courses,
  services,
  books,
  product,
}

export class HHDate {
  @Prop()
  count: number;

  @Prop()
  juniorSalary: number;

  @Prop()
  middleSalary: number;

  @Prop()
  seniorSalary: number;
}

export class PageAdvantages {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

@Schema({ timestamps: true, autoIndex: true })
export class TopPageModel {
  @Prop(TopLevelCategory)
  firstLevel: TopLevelCategory;

  @Prop({ unique: true })
  alias: string;

  @Prop()
  secondLevel: string;

  @Prop({ text: true })
  title: string;

  @Prop()
  category: string;

  @Prop([PageAdvantages])
  advantages: PageAdvantages[];

  @Prop(HHDate)
  hh?: HHDate;

  @Prop({ text: true })
  seoText: string;

  @Prop()
  tagsTitle: string;

  @Prop([String])
  tags: string[];

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);

TopPageSchema.index({ '$**': 'text' });
