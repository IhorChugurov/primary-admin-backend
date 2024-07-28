import { IsString, MaxLength } from "class-validator";

export class CreateGroupDto {
  @IsString()
  @MaxLength(200)
  readonly name: string;

  @IsString()
  @MaxLength(1000)
  readonly description?: string;
}
