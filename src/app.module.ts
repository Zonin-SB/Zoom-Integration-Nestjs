import { Module } from '@nestjs/common';
import { ZoomModule } from './zoom/zoom.module';

@Module({
  imports: [ZoomModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
