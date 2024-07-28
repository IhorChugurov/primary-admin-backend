import { PaginationMetaParametersInterface } from "../interfaces/pagination-meta-parameters.interface";

export class PaginationMetaDto {
  readonly currentPage: number;

  readonly perPage: number;

  readonly totalItems: number;

  readonly totalPages: number;

  readonly hasPreviousPage: boolean;

  readonly hasNextPage: boolean;

  constructor({ paginationOptionsDto, totalItems }: PaginationMetaParametersInterface) {
    this.currentPage = paginationOptionsDto.currentPage;
    this.perPage = paginationOptionsDto.perPage;
    this.totalItems = totalItems;
    this.totalPages = Math.ceil(this.totalItems / this.perPage);
    this.hasPreviousPage = this.currentPage > 1;
    this.hasNextPage = this.currentPage < this.totalPages;
  }
}
