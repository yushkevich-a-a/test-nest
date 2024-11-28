import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductModel } from './product.model';
import { Model } from 'mongoose';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewModel } from 'src/review/review.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly productModel: Model<ProductModel>,
  ) {}

  async create(dto: CreateProductDto) {
    const createProduct = new this.productModel(dto);
    return createProduct.save();
  }

  async findById(id: string) {
    return this.productModel.findById(id).exec();
  }

  async deleteProduct(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async updateProduct(id: string, dto: CreateProductDto) {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findWithReviews(dto: FindProductDto) {
    return this.productModel
      .aggregate([
        {
          $match: {
            categories: dto.category,
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $limit: dto.limit,
        },
        {
          $lookup: {
            from: 'reviewmodels',
            localField: '_id',
            foreignField: 'productId',
            as: 'reviews',
          },
        },
        {
          $addFields: {
            reviewCount: {
              $size: '$reviews',
            },
            reviewAvg: {
              $avg: '$reviews.rating',
            },
          },
        },
      ])
      .exec() as unknown as (ProductModel & {
      reviews: ReviewModel[];
      reviewCount: number;
      reviewAvg: number;
    })[];
  }
}
