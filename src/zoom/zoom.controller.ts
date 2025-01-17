import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ZoomService } from './zoom.service';
import {
  CreateMeetingDto,
  GetMeetingDetailsDto,
  GetMeetingRecordingsDto,
  ListRecordingsDto,
  UpdateMeetingDto,
} from './dto';

@Controller('zoom')
export class ZoomController {
  constructor(private readonly zoomService: ZoomService) {}

  @Get('getMeetingDetails')
  async getMeetingDetails(@Query() getMeetingDetailsDto: GetMeetingDetailsDto) {
    return this.zoomService.getMeetingDetails(getMeetingDetailsDto);
  }

  @Post('createMeeting')
  createZoomMeeting(@Body() createMeetingDto: CreateMeetingDto) {
    return this.zoomService.createZoomMeeting(createMeetingDto);
  }

  @Patch('updateMeeting')
  updateZoomMeeting(@Body() updateMeetingDto: UpdateMeetingDto) {
    return this.zoomService.updateZoomMeeting(updateMeetingDto);
  }

  @Get('getRecordings')
  async getRecordings(
    @Query() getMeetingRecordingsDto: GetMeetingRecordingsDto,
  ) {
    return this.zoomService.getRecordings(getMeetingRecordingsDto);
  }

  @Get('listRecordingInstances')
  async getRecordingInstances(
    @Query() getMeetingRecordingsDto: GetMeetingRecordingsDto,
  ) {
    return this.zoomService.getRecordingInstances(getMeetingRecordingsDto);
  }

  @Get('listUserRecordings')
  async listRecordings(@Query() listRecordingsDto: ListRecordingsDto) {
    return this.zoomService.listRecordings(listRecordingsDto);
  }
}
