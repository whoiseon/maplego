import { IsNotEmpty, IsString } from 'class-validator';

export class ExistDisplayNameDto {
  @IsString()
  @IsNotEmpty()
  public displayName: string;
}
