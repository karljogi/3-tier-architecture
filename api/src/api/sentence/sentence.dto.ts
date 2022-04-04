import { IsNotEmpty, IsString } from 'class-validator';

export class SentenceDto {
  @IsString()
  @IsNotEmpty()
  public sentence: string;
}
