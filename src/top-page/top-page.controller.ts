import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IDValidationPipe } from 'src/pipes/id-validation.pipe';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageService } from './top-page.service';
import { NOT_FOUND_PAGE } from './top-page.constants';
import { FindTopPageDto } from './dto/find-top-page.gto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto);
  }

  @Get('/:id')
  async getById(@Param('id', IDValidationPipe) id: string) {
    const topPage = this.topPageService.findById(id);
    if (!topPage) {
      throw new NotFoundException(NOT_FOUND_PAGE);
    }
    return topPage;
  }

  @Get('/alias/:alias')
  async get(@Param('alias') alias: string) {
    const topPage = this.topPageService.findByAlias(alias);
    if (!topPage) {
      throw new NotFoundException(NOT_FOUND_PAGE);
    }
    return topPage;
  }

  @Get('/searchText/:text')
  async getPageByText(@Param('text') text: string) {
    return this.topPageService.findBySearchText(text);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('category')
  async findByCategory(@Body() dto: FindTopPageDto) {
    return this.topPageService.findByCategory(dto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch('/:id')
  async update(
    @Param('id', IDValidationPipe) id: string,
    @Body() dto: CreateTopPageDto,
  ) {
    const updatedPage = this.topPageService.updateTopPage(id, dto);
    if (!updatedPage) {
      throw new NotFoundException(NOT_FOUND_PAGE);
    }
    return updatedPage;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IDValidationPipe) id: string) {
    const deletedTopPage = this.topPageService.delete(id);
    if (!deletedTopPage) {
      throw new NotFoundException(NOT_FOUND_PAGE);
    }
  }
}
