import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMeetingDto {
  @IsOptional()
  @IsString()
  topic: string;

  @IsOptional()
  @IsString()
  agenda?: string;

  @IsOptional()
  @IsDateString()
  startTime: string;

  @IsOptional()
  @IsNumber()
  duration: number; // Duration in minutes

  @IsOptional()
  @IsString()
  password?: string;
}

export class UpdateMeetingDto {
  @IsNotEmpty()
  @IsString()
  meetingId: string;

  @IsOptional()
  @IsString()
  topic: string;

  @IsOptional()
  @IsString()
  agenda?: string;

  @IsOptional()
  @IsDateString()
  startTime: string;

  @IsOptional()
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

export class GetMeetingDetailsDto {
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
