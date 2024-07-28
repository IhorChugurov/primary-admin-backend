import { PaginationOptionsDto } from "../dto/pagination-options.dto";

export interface PaginationMetaParametersInterface {
  paginationOptionsDto: PaginationOptionsDto;
  totalItems: number;
}
