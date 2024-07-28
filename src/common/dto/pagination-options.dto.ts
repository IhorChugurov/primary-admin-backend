import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { Order } from "../constants/order.constant";

export class PaginationOptionsDto {
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly currentPage?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly perPage?: number = 10;

  @IsString()
  @IsOptional()
  readonly search?: string;

  @IsString()
  @IsOptional()
  readonly queryString?: string;

  get skip(): number {
    return (this.currentPage - 1) * this.perPage;
  }
}
