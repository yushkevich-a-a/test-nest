import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
  HttpCode,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { PRODUCT_NOT_FOUND } from './product.constants';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: CreateProductDto) {
    return await this.productService.create(dto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const product = await this.productService.findById(id);
    if (!!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }
    return product;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleteProduct = await this.productService.deleteProduct(id);
    if (!!deleteProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: ProductModel) {
    const updateProduct = await this.productService.updateProduct(id, dto);
    if (!!updateProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }
    return updateProduct;
  }

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindProductDto) {}
}
