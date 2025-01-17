import { Injectable } from '@nestjs/common';
import {
  CreateMeetingDto,
  GetMeetingDetailsDto,
  GetMeetingRecordingsDto,
  ListRecordingsDto,
  UpdateMeetingDto,
} from './dto';
import { ZoomSDKService } from '@app/common/zoom/zoom.service';
import {
  CreateZoomMeetingResponse,
  ZoomMeetingRecordingsResponse,
  ZoomMeetingUserRecordingsResponse,
} from '@app/common/types/zoom.types';

@Injectable()
export class ZoomService {
  constructor(private zoomService: ZoomSDKService) {}

  async getMeetingDetails(
    getMeetingDetailsDto: GetMeetingDetailsDto,
  ): Promise<ZoomMeetingRecordingsResponse> {
    const { meetingId } = getMeetingDetailsDto;
    try {
      const accessToken = await this.zoomService.generateO2AuthJwtToken();

      const meeting = await this.zoomService.getMeetingDetails(
        meetingId,
        accessToken,
      );

      return meeting;
    } catch (error) {
      throw error;
    }
  }

  async createZoomMeeting(
    createMeetingDto: CreateMeetingDto,
  ): Promise<CreateZoomMeetingResponse> {
    const {
      duration = 60,
      startTime,
      topic = 'Meeting Name',
      agenda = 'Meeting agenda',
      password,
    } = createMeetingDto;

    const accessToken = await this.zoomService.generateO2AuthJwtToken();
    const meetingConfig = {
      topic: topic,
      type: 2, //  for scheduled meeting
      // type: 1,  //  for instant meeting
      duration: duration,
      start_time: startTime,
      // startTime: startDateTime,
      agenda: agenda,
      password: password,
      timezone: 'Asia/Kolkata', // Set timezone to India
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: true,
        mute_upon_entry: true,
        waiting_room: false,
        audio: 'both',
        private_meeting: false,
        // auto_start: true
      },
    };
    try {
      const response = await this.zoomService.createZoomMeeting(
        meetingConfig,
        accessToken,
      );
      // Generate SDK token for this meeting
      const guestSdkToken = await this.zoomService.generateSignature(
        response,
        0, //  0 for guest
      );
      const hostSdkToken = await this.zoomService.generateSignature(
        response,
        1, //  1 for host
      );
      return {
        meetingId: response,
        guestSdkToken: guestSdkToken,
        hostSdkToken: hostSdkToken,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async updateZoomMeeting(
    updateMeetingDto: UpdateMeetingDto,
  ): Promise<CreateZoomMeetingResponse> {
    const {
      duration = 60,
      startTime,
      topic = 'Meeting Name',
      agenda = 'Meeting agenda',
      password,
      meetingId,
    } = updateMeetingDto;

    const accessToken = await this.zoomService.generateO2AuthJwtToken();
    const meetingConfig = {
      topic: topic,
      type: 2, //  for scheduled meeting
      // type: 1,  //  for instant meeting
      duration: duration,
      start_time: startTime,
      // startTime: startDateTime,
      agenda: agenda,
      password: password,
      timezone: 'Asia/Kolkata', // Set timezone to India
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: true,
        mute_upon_entry: true,
        waiting_room: false,
        audio: 'both',
        private_meeting: false,
        // auto_start: true
      },
    };
    try {
      const response = await this.zoomService.updateZoomMeeting(
        meetingId,
        meetingConfig,
        accessToken,
      );
      // Generate SDK token for this meeting
      const guestSdkToken = await this.zoomService.generateSignature(
        response,
        0, //  0 for guest
      );
      const hostSdkToken = await this.zoomService.generateSignature(
        response,
        1, //  1 for host
      );
      return {
        meetingId: response,
        guestSdkToken: guestSdkToken,
        hostSdkToken: hostSdkToken,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getRecordings(
    getMeetingRecordingsDto: GetMeetingRecordingsDto,
  ): Promise<ZoomMeetingRecordingsResponse> {
    const { meetingId } = getMeetingRecordingsDto;
    try {
      const accessToken = await this.zoomService.generateO2AuthJwtToken();

      const recordings = await this.zoomService.getMeetingRecordings(
        meetingId,
        accessToken,
      );

      return recordings;
    } catch (error) {
      throw error;
    }
  }

  async getRecordingInstances(
    getMeetingRecordingsDto: GetMeetingRecordingsDto,
  ): Promise<ZoomMeetingRecordingsResponse> {
    const { meetingId } = getMeetingRecordingsDto;
    try {
      const accessToken = await this.zoomService.generateO2AuthJwtToken();

      const recordings = await this.zoomService.getMeetingRecordingsInstances(
        meetingId,
        accessToken,
      );

      return recordings;
    } catch (error) {
      throw error;
    }
  }

  async listRecordings(
    listRecordingsDto: ListRecordingsDto,
  ): Promise<ZoomMeetingUserRecordingsResponse> {
    const { userId, from } = listRecordingsDto;
    try {
      const accessToken = await this.zoomService.generateO2AuthJwtToken();

      const recordings = await this.zoomService.listRecordings(
        userId,
        accessToken,
        from,
      );

      return recordings;
    } catch (error) {
      throw error;
    }
  }
}
