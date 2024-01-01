import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BookDto {
  @IsOptional()
  id?: string;

  @IsNumber()
  @IsNotEmpty()
  isbn: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  @IsNotEmpty()
  pages: number;

  @IsString()
  @IsNotEmpty()
  language: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsDate()
  @IsNotEmpty()
  published: Date;

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  website: string;
}
