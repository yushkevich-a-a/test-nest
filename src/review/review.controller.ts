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
import { ReviewModel } from './review.model';

@Controller('review')
export class ReviewController {
  @Post()
  async create(@Body() dto: Omit<ReviewModel, '_id'>) {}

  @Get('getByProduct/:id')
  async getByProduct(@Param('id') id: string) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}
}
