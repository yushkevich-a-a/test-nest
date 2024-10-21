import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('review')
export class ReviewController {
  constructor() {}

  @Post()
  async create(@Body() dto: CreateReviewDto) {}

  @Get('getByProduct/:id')
  async getByProduct(@Param('id') id: string) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}
}
