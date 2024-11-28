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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IDValidationPipe } from 'src/pipes/id-validation.pipe';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageService } from './top-page.service';
import { NOT_FOUND_PAGE } from './top-page.constants';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) { }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto);
  }

  @Get('/:alias')
  async get(@Param('alias') alias: string) {
    const topPage = this.topPageService.findByAlias(alias);
    if (!!topPage) {
      throw new NotFoundException(NOT_FOUND_PAGE);
    }
    return topPage;
  }

  async update(@Param('id', IDValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
    const updatePage = this.topPageService.updateTopPage(id, dto);
    if (!!updatePage) {
      throw new NotFoundException(NOT_FOUND_PAGE);
    }
    return updatePage;
  }

  @Delete(':id')
  async delete(@Param('id', IDValidationPipe) id: string) {
    const topPage = this.topPageService.delete(id);
    if (!!topPage) {
      throw new NotFoundException(NOT_FOUND_PAGE);
    }
  }
}
