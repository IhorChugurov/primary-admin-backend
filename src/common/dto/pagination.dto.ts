import { IsNumber, IsArray } from "class-validator";
import { PaginationMetaDto } from "./pagination-meta.dto";

export class PaginationDto<T> {
  @IsArray()
  readonly items: T[];

  @IsNumber()
  readonly meta: PaginationMetaDto;

  constructor(items: T[], meta: PaginationMetaDto) {
    this.items = items;
    this.meta = meta;
  }
}
