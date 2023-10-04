import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpBodyDto {
  @IsString()
  @IsNotEmpty()
  public displayName: string;

  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public email: string;
}
