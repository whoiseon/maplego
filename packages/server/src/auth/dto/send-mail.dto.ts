import { IsNotEmpty, IsString } from 'class-validator';

export class SendMailDto {
  @IsString()
  @IsNotEmpty()
  public email: string;
}
