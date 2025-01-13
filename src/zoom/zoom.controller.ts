import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ZoomService } from './zoom.service';
import {
  CreateMeetingDto,
  GetMeetingRecordingsDto,
  ListRecordingsDto,
} from './dto';

@Controller('zoom')
export class ZoomController {
  constructor(private readonly zoomService: ZoomService) {}

  @Post('createMeeting')
  createZoomMeeting(@Body() createMeetingDto: CreateMeetingDto) {
    return this.zoomService.createZoomMeeting(createMeetingDto);
  }

  @Get('getRecordings')
  async getRecordings(
    @Query() getMeetingRecordingsDto: GetMeetingRecordingsDto,
  ) {
    return this.zoomService.getRecordings(getMeetingRecordingsDto);
  }

  @Get('listRecordings')
  async listRecordings(@Query() listRecordingsDto: ListRecordingsDto) {
    return this.zoomService.listRecordings(listRecordingsDto);
  }
}
