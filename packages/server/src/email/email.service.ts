import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import sanitize from 'sanitize-html';
import { EmailParams } from './types/email-params.type';
import { SendEmailRequest, SendEmailResponse } from 'aws-sdk/clients/ses';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private ses: AWS.SES;

  constructor(private readonly configService: ConfigService) {
    this.ses = new AWS.SES({
      region: 'us-east-1',
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  public async sendMail({
    to,
    subject,
    body,
    from,
  }: EmailParams): Promise<SendEmailResponse> {
    return new Promise((resolve, reject) => {
      const params: SendEmailRequest = {
        Destination: {
          ToAddresses: typeof to === 'string' ? [to] : to,
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: body,
            },
            Text: {
              Charset: 'UTF-8',
              Data: sanitize(body, { allowedTags: [] }),
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: subject,
          },
        },
        Source: from,
      };

      this.ses.sendEmail(params, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  public createRandomCode(): number {
    return Math.floor(Math.random() * 900000) + 100000;
  }
}
