import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductModel>;

export class ProductCharacteristics {
  name: string;
  value: string;
}

@Schema({ timestamps: true, autoIndex: true })
export class ProductModel {
  @Prop()
  image: string;

  @Prop()
  titleCourse: string;

  @Prop()
  descriptionCourse: string;

  @Prop()
  rateCount: number;

  @Prop()
  price: number;

  @Prop()
  oldPrice: number;

  @Prop()
  credit: number;

  @Prop()
  advantages: string[];

  @Prop()
  disAdvantages: string[];

  @Prop({ type: () => [ProductCharacteristics] })
  options: ProductCharacteristics[];

  @Prop({ type: () => [String] })
  categories: string[];

  @Prop({ type: () => [String] })
  tabs: string[];
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
