import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema, Types } from 'mongoose';
import { ProductModel } from './../product/product.model';
export type ReviewDocument = HydratedDocument<ReviewModel>;

@Schema({ timestamps: true, autoIndex: true })
export class ReviewModel {
  @Prop()
  username: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  rating: number;

  @Prop({ type: MSchema.Types.ObjectId, ref: ProductModel.name })
  productId: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
