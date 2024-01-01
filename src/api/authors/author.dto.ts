import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthorDto {
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  language: string;

  @IsOptional()
  @IsDate()
  died?: Date;
}
