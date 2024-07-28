import { IsOptional, IsString, MaxLength } from "class-validator";

export class CreateProjectDto {
  @IsString()
  @MaxLength(200)
  readonly name: string;

  @IsString()
  @MaxLength(1000)
  @IsOptional()
  readonly description?: string;
}
