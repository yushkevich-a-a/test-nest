import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(@Body() dto: CreateReviewDto) {
    this.reviewService.create(dto);
  }

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') id: string) {
    return this.reviewService.findByProductId(id);
  }

  @Delete('byProduct/:productId')
  async deleteByProductId(@Param('productId') id: string) {
    this.reviewService.deleteByProductId(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = this.reviewService.delete(id);

    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
