import { IsOptional, IsString, MaxLength } from "class-validator";

export class CreateGroupDto {
  @IsString()
  @MaxLength(200)
  readonly name: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  readonly description?: string;
}
