import { IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  public profileImage?: string = '';

  @IsString()
  public displayName?: string = '';

  @IsString()
  public introduction?: string = '';
}
