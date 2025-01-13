import { Injectable } from '@nestjs/common';
import {
  CreateMeetingDto,
  GetMeetingRecordingsDto,
  ListRecordingsDto,
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
    console.log(accessToken, 'accessToken');
    const meetingConfig = {
      topic: topic,
      type: 2, //  for scheduled meeting
      // type: 1,  //  for instant meeting
      duration: duration,
      startTime: startTime,
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

  async getRecordings(
    getMeetingRecordingsDto: GetMeetingRecordingsDto,
  ): Promise<ZoomMeetingRecordingsResponse> {
    const { meetingId } = getMeetingRecordingsDto;
    try {
      console.log(meetingId, 'meetingId');
      const accessToken = await this.zoomService.generateO2AuthJwtToken();
      console.log(accessToken, 'accessToken');

      const recordings = await this.zoomService.getMeetingRecordings(
        meetingId,
        accessToken,
      );
      // const response = await axios.get(
      //   `${this.ZOOM_API_BASE_URL}/users/${userId}/recordings`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${process.env.ZOOM_JWT_TOKEN}`,
      //       'Content-Type': 'application/json',
      //     },
      //     params: {
      //       page_size: 30, // Adjust as needed
      //       from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Last 30 days
      //     },
      //   },
      // );

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
      console.log(userId, 'userId');
      const accessToken = await this.zoomService.generateO2AuthJwtToken();
      console.log(accessToken, 'accessToken');

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
