import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import zoomConfig from './settings/zoom.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [zoomConfig],
    }),
  ],
  exports: [ConfigModule],
})
export class CommonConfigModule {}
