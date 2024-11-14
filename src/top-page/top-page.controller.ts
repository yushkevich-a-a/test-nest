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
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.gto';
import { IDValidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('top-page')
export class TopPageController {
  @Get('get/:alias')
  async get(@Param('alias') alias: string) {}

  @HttpCode(200)
  @Post('find')
  async getByCategory(@Body() dto: FindTopPageDto) {}

  @Post('save')
  async save(@Body() dto: Omit<TopPageModel, '_id'>) {}

  @Delete(':id')
  async delete(@Param('id', IDValidationPipe) id: string) {}
}
