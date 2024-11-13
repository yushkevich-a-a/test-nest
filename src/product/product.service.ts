import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductModel } from './product.model';
import { Model } from 'mongoose';

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
}
