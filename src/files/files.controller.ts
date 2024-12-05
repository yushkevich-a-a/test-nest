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
import { MFile } from './mfile.class';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('files'))
  async uploadFiles(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileElementResponse[]> {
    const serveFiles: MFile[] = [file];
    if (file.mimetype.includes('image')) {
      const webp = await this.filesService.convertToWebp(file.buffer);
      serveFiles.push({
        originalname: `${file.originalname.split('.')[0]}.webp`,
        buffer: webp,
      });
    }

    return this.filesService.saveFiles(serveFiles);
  }
}
