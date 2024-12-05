import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FilesService } from './files.service';
import { FileElementResponse } from './dto/file-elements.response';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('files'))
  async uploadFiles(
    @UploadedFile() files: Express.Multer.File,
  ): Promise<FileElementResponse[]> {
    return this.filesService.saveFiles([files]);
  }
}
