import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyMailDto {
  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public code: string;
}
