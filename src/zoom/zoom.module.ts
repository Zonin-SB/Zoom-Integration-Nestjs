import { Module } from '@nestjs/common';
import { ZoomService } from './zoom.service';
import { ZoomController } from './zoom.controller';
import { ZoomSDKService } from '@app/common/zoom/zoom.service';
import { CommonConfigModule } from '@app/common/config/config.module';
// import { CommonConfigModule } from '@app/common/config/config.module';

@Module({
  imports: [CommonConfigModule],
  controllers: [ZoomController],
  providers: [ZoomSDKService, ZoomService],
})
export class ZoomModule {}
