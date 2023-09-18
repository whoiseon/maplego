import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordBodyDto {
  @IsString()
  @IsNotEmpty()
  public currentPassword: string;

  @IsString()
  @IsNotEmpty()
  public newPassword: string;
}
