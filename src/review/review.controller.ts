import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { IDValidationPipe } from 'src/pipes/id-validation.pipe';
import { TelegramService } from 'src/telegram/telegram.service';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly telegramService: TelegramService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('notify')
  async notify(@Body() dto: CreateReviewDto) {
    const message =
      `Имя ${dto.username}\n` +
      `Загловок: ${dto.description}\n` +
      `Описание: ${dto.description}\n` +
      `Рейтинг: ${dto.rating}\n` +
      `ID продукта: ${dto.productId}`;
    return this.telegramService.sendMessage(message);
  }

  @Get('byProduct/:id')
  async getByProduct(@Param('id', IDValidationPipe) id: string) {
    return this.reviewService.findByProductId(id);
  }

  @Delete('byProduct/:id')
  async deleteByProductId(@Param('id', IDValidationPipe) id: string) {
    return this.reviewService.deleteByProductId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.reviewService.delete(id);
    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
