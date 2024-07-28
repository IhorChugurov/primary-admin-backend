import { SetMetadata } from "@nestjs/common";

export const DTO = "dto";

export const UseDto = (dto: any) => SetMetadata(DTO, dto);
