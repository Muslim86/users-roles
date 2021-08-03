import { IsArray, IsDefined, IsString, Length, Matches } from "class-validator";

export class UserDto {

  @IsString()
  @IsDefined()
  @Length(1)
  readonly name: string;

  @IsString()
  @IsDefined()
  @Length(1)
  readonly login: string;

  @IsString()
  @IsDefined()
  @Length(1)
  @Matches(/(\d).*(?=[A-Z|А-Я])|([A-Z|А-Я]).*(?=(\d))/, {message: 'Must contain an uppercase letter and a number'})
  readonly password: string;

  @IsArray()
  readonly roles: string[];
}