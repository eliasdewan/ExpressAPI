import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AddressDto } from '../../auth/dtos/register-user.dto';

export class createAccountDto {
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
