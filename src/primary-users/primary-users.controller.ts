import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { PrimaryUsersService } from "./primary-users.service";
import { CreatePrimaryUserDto } from "./dto/create-primary-user.dto";
import { UpdatePrimaryUserDto } from "./dto/update-primary-user.dto";
import { Roles } from "./authorization/decorators/primary-roles.decorator";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { UseDto } from "src/common/decorators/dto.decorator";
import { PrimaryUserDto } from "./dto/primary-user.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";

@Roles("SuperAdmin", "Admin")
@Controller("primary-users")
export class PrimaryUsersController {
  constructor(private readonly primaryUsersService: PrimaryUsersService) {}

  @UseDto(PrimaryUserDto)
  @Post()
  create(@Body() createPrimaryUserDto: CreatePrimaryUserDto): Promise<PrimaryUserDto> {
    return this.primaryUsersService.create(createPrimaryUserDto);
  }

  // TODO add @UseDto decorator for pagination.
  @Get()
  findMany(
    @Query() paginationOptionsDto: PaginationOptionsDto,
  ): Promise<PaginationDto<PrimaryUserDto>> {
    return this.primaryUsersService.findMany(paginationOptionsDto);
  }

  @UseDto(PrimaryUserDto)
  @Get(":id")
  findOne(@Param("id") primaryUserId: string): Promise<PrimaryUserDto> {
    return this.primaryUsersService.findOne(primaryUserId);
  }

  @UseDto(PrimaryUserDto)
  @Patch(":id")
  update(
    @Param("id") primaryUserId: string,
    @Body() updatePrimaryUserDto: UpdatePrimaryUserDto,
  ): Promise<PrimaryUserDto> {
    return this.primaryUsersService.update(primaryUserId, updatePrimaryUserDto);
  }

  @Delete(":id")
  remove(@Param("id") primaryUserId: string): Promise<ResponseMessage> {
    return this.primaryUsersService.remove(primaryUserId);
  }
}
