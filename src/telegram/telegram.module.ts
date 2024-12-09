import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [TelegramService],
  imports: [ConfigModule],
  exports: [TelegramService],
})
export class TelegramModule {}
