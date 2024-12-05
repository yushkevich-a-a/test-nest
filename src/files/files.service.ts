import { Injectable } from '@nestjs/common';
import { FileElementResponse } from './dto/file-elements.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FilesService {
  async saveFiles(
    files: Express.Multer.File[],
  ): Promise<FileElementResponse[]> {
    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = `${path}/upload/${dateFolder}`;
    await ensureDir(uploadFolder);
    const fileElements: FileElementResponse[] = [];
    for (let file of files) {
      await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
      fileElements.push({
        url: `${dateFolder}/${file.originalname}`,
        name: file.originalname,
      });
    }
    return fileElements;
  }
}
