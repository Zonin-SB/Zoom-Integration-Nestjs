// common-lib/src/firebase.module.ts
import { Module } from '@nestjs/common';
import { CommonConfigModule } from '../config/config.module';
import { ZoomSDKService } from './zoom.service';

@Module({
  imports: [CommonConfigModule],
  providers: [ZoomSDKService],
  exports: [ZoomSDKService],
})
export class ZoomModule {}
