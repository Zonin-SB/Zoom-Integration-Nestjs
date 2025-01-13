import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMeetingDto {
  @IsString()
  topic: string;

  @IsOptional()
  @IsString()
  agenda?: string;

  @IsDateString()
  startTime: string;

  @IsNumber()
  duration: number; // Duration in minutes

  @IsOptional()
  @IsString()
  password?: string;
}

export class GetMeetingRecordingsDto {
  @IsNotEmpty()
  @IsString()
  meetingId: string;
}

export class ListRecordingsDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional()
  @IsDateString()
  from?: string;
}
