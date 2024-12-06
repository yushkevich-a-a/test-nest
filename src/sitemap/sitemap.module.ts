import { Module } from '@nestjs/common';
import { SitemapController } from './sitemap.controller';
import { TopPageService } from 'src/top-page/top-page.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [SitemapController],
  imports: [TopPageService, ConfigModule],
})
export class SitemapModule {}
