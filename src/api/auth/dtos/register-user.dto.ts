import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength, ValidateNested } from 'class-validator';

export class UserProfileDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  middleName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  avatar?: string;
}

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  building: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  town: string;

  @IsString()
  county: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  postcode: string;
}

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  password: string;

  @ValidateNested()
  profile: UserProfileDto;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ValidateNested()
  address: AddressDto;
}
