import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AddressDto } from '../../auth/dtos/register-user.dto';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  businessName: string;

  @IsString()
  @IsOptional()
  website: string;

  @IsString()
  @IsNotEmpty()
  domain: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @ValidateNested()
  address: AddressDto;
}
export class FindAccountDto {
  @IsString()
  @IsNotEmpty()
  businessName: string;
}

export class UpdateAccountDto {
  @IsString()
  @IsOptional()
  businessName: string;

  @IsString()
  @IsOptional()
  website: string;

  @IsString()
  @IsOptional()
  domain: string;

  @IsString()
  @IsOptional()
  phone: string;
}
