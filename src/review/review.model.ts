import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { ProductModel } from '../../src/product/product.model';

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
  productId: ProductModel;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
