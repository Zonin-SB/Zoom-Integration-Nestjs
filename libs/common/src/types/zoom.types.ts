export interface CreateZoomMeetingResponse {
  meetingId: string;
  guestSdkToken: string;
  hostSdkToken: string;
}
export interface ZoomRecordingFile {
  id: string;
  meeting_id: string;
  recording_start: string;
  recording_end: string;
  file_type: string;
  file_extension: string;
  file_size: number;
  play_url?: string;
  download_url: string;
  status: string;
  recording_type: string;
}

export interface ZoomMeetingRecordingsResponse {
  uuid: string;
  id: number;
  account_id: string;
  host_id: string;
  topic: string;
  type: number;
  start_time: string;
  timezone: string;
  host_email: string;
  duration: number;
  total_size: number;
  recording_count: number;
  share_url: string;
  recording_files: ZoomRecordingFile[];
  password?: string;
  recording_play_passcode?: string;
}
export interface ZoomMeetingUserRecordingsResponse {
  from: string;
  to: string;
  page_count: number;
  page_size: number;
  total_records: number;
  next_page_token: string;
  meetings: ZoomMeetingRecordingsResponse[];
}
