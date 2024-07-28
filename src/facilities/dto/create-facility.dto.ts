import { IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateFacilityDto {
  @IsString()
  @MaxLength(200)
  readonly name: string;

  @IsString()
  @MaxLength(1000)
  @IsOptional()
  readonly description?: string;

  @IsUUID()
  readonly groupId: string;
}
