import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';

@Controller('product')
export class ProductController {
  @Post()
  async create(@Body() dto: Omit<ProductModel, '_id'>) {}

  @Get(':id')
  async get(@Param() id: string) {}

  @Delete(':id')
  async delete(@Param() id: string) {}

  @Patch(':id')
  async update(@Param() id: string, @Body() dto: ProductModel) {}

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindProductDto) {}
}
