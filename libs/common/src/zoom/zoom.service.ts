import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import base64 from 'base-64';
import * as base64 from 'base-64';
import KJUR from 'jsrsasign';
import axios from 'axios';
import zoomConfig from '../config/settings/zoom.config';
import {
  ZoomMeetingRecordingsResponse,
  ZoomMeetingUserRecordingsResponse,
} from '../types/zoom.types';

@Injectable()
export class ZoomSDKService {
  private readonly logger = new Logger(ZoomSDKService.name);
  private zoomConfig;

  constructor(private configService: ConfigService) {
    this.zoomConfig = this.configService.get('zoom');
    console.log(zoomConfig, 'zoomConfig');
  }

  private async getAuthHeaders(): Promise<Record<string, string>> {
    const { zoomClientId, zoomClientSecret } = this.zoomConfig;
    if (!zoomClientId || !zoomClientSecret) {
      throw new Error('Zoom Client ID or Secret is not configured');
    }
    const encodedCredentials = base64.encode(
      `${zoomClientId}:${zoomClientSecret}`,
    );
    return {
      Authorization: `Basic ${encodedCredentials}`,
      'Content-Type': 'application/json',
    };
  }
  public async generateO2AuthJwtToken(): Promise<string> {
    try {
      //  zoomAccountId is the accountId of server to server app
      const { zoomAccountId } = this.zoomConfig;
      if (!zoomAccountId) {
        throw new Error('Zoom Account ID is not configured');
      }
      const url = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${zoomAccountId}`;
      const headers = await this.getAuthHeaders();
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
      });
      if (!response.ok) {
        this.logger.error(
          `Failed to fetch Zoom access token: ${response.statusText}`,
        );
        throw new Error('Failed to fetch Zoom access token');
      }

      const { access_token } = await response.json();
      this.logger.log('Zoom access token generated successfully');
      return access_token;
    } catch (error) {
      console.log('generateZoomAccessToken Error --> ', error);
      throw error;
    }
  }

  public async generateSignature(
    meetingNumber: string,
    role: number,
  ): Promise<string> {
    try {
      //  zoomSdkClientId is the clientId of general app
      //  zoomSdkClientSecret is the client secret of general app
      const { zoomSdkClientId, zoomSdkClientSecret } = this.zoomConfig;
      if (!zoomSdkClientId || !zoomSdkClientSecret) {
        throw new Error('Zoom Client ID or Secret is not configured');
      }
      const iat = Math.round(new Date().getTime() / 1000) - 30;
      //   const exp = iat + 60 * 60 * 2;  // two hours
      const exp = iat + 60 * 60 * 24 * 2; // two days
      const oHeader = { alg: 'HS256', typ: 'JWT' };

      const oPayload = {
        sdkKey: zoomSdkClientId,
        appKey: zoomSdkClientId,
        mn: meetingNumber,
        role: role,
        iat: iat,
        exp: exp,
        tokenExp: exp,
      };

      const sHeader = JSON.stringify(oHeader);
      const sPayload = JSON.stringify(oPayload);
      const sdkJWT = KJUR.jws.JWS.sign(
        'HS256',
        sHeader,
        sPayload,
        zoomSdkClientSecret,
      );
      return sdkJWT;
    } catch (error) {
      this.logger.error('Failed to generate signature', error);
      throw new Error('Failed to generate signature');
    }
  }

  public async createZoomMeeting(
    meetingConfig: Record<string, any>,
    accessToken: string,
  ): Promise<string> {
    try {
      const url = 'https://api.zoom.us/v2/users/me/meetings';

      const response = await axios.post(url, meetingConfig, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        const meetingId = response.data.id; // Extract meeting ID from the response
        this.logger.log(
          `Zoom meeting created successfully with ID: ${meetingId}`,
        );
        return meetingId?.toString();
      } else {
        this.logger.error(
          `Unexpected response status: ${response.status} - ${response.statusText}`,
        );
        throw new Error('Failed to create Zoom meeting');
      }
    } catch (error) {
      this.logger.error('Error creating Zoom meeting', error.stack);
      throw error;
    }
  }

  public async getMeetingRecordings(
    meetingId: string,
    accessToken: string,
  ): Promise<ZoomMeetingRecordingsResponse> {
    try {
      const url = `https://api.zoom.us/v2/meetings/${meetingId}/recordings`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        // params: {
        //   page_size: 30, // Adjust as needed
        //   from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Last 30 days
        // },
      });
      console.log(response, 'response');
      return response.data;
    } catch (error) {
      this.logger.error(
        'Error retrieving Zoom meeting recordings',
        error.stack,
      );
      throw error;
    }
  }

  public async listRecordings(
    userId: string,
    accessToken: string,
    from?: string,
  ): Promise<ZoomMeetingUserRecordingsResponse> {
    try {
      const url = `https://api.zoom.us/v2/users/${userId}/recordings`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        params: {
          page_size: 30, // Adjust as needed
          from:
            from ||
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Default to last 30 days if from is not provided
        },
      });
      console.log(response, 'response');
      return response.data;
    } catch (error) {
      this.logger.error('Error listing Zoom recordings', error.stack);
      throw error;
    }
  }
}
