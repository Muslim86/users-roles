import { IsDefined, IsString } from "class-validator";

export class GetUserDto {
  @IsString()
  @IsDefined()
  readonly login: string;
}