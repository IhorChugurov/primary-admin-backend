import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { PaginationMetaDto } from "src/common/dto/pagination-meta.dto";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { plainToInstance } from "class-transformer";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";
import { ProjectsService } from "src/projects/projects.service";
import { FacilityUserRepository } from "./repositories/facility-user.repository";
import { FacilitiesService } from "src/facilities/facilities.service";
import { FacilityRolesService } from "src/facility-roles/facility-roles.service";
import { CreateFacilityUserDto } from "./dto/create-facility-user.dto";
import { FacilityUser } from "./entities/facility-user.entity";
import { FacilityUserListDto } from "./dto/facility-user-list.dto";
import { predefinedFacilityRoles } from "src/facility-roles/constants/facility-roles.constant";
import { FacilityUserQueryDto } from "./dto/faciltiy-user-query.dto";

@Injectable()
export class FacilityUsersService {
  constructor(
    private readonly facilityUserRepository: FacilityUserRepository,
    private readonly usersService: UsersService,
    private readonly facilitiesService: FacilitiesService,
    private readonly facilityRolesService: FacilityRolesService,
    private readonly projectsService: ProjectsService,
  ) {}

  async create(
    createFacilityUserDto: CreateFacilityUserDto,
    projectId: string,
  ): Promise<FacilityUser> {
    const user = await this.usersService.findOrCreate(createFacilityUserDto.email);
    const facility = await this.facilitiesService.findOne(createFacilityUserDto.facilityId);
    const adminFacilityRole = predefinedFacilityRoles.find(
      (facilityRole) => facilityRole.name === "Admin",
    );
    const project = await this.projectsService.findOne(projectId);
    const facilityRole = await this.facilityRolesService.findOneByName(
      adminFacilityRole.name,
      projectId,
    );
    return this.facilityUserRepository.createAndSave(user, facility, facilityRole, project);
  }

  async findMany(
    paginationOptionsDto: PaginationOptionsDto,
    projectId: string,
    query: FacilityUserQueryDto,
  ): Promise<PaginationDto<FacilityUserListDto>> {
    const { entities, totalItems } =
      await this.facilityUserRepository.findManyWithPaginationAndRelations(
        paginationOptionsDto,
        projectId,
        query.facilityId,
      );

    const facilityUserDtos = plainToInstance(FacilityUserListDto, entities, {
      excludeExtraneousValues: true,
    });

    const paginationMetaDto = new PaginationMetaDto({
      paginationOptionsDto,
      totalItems,
    });

    return new PaginationDto(facilityUserDtos, paginationMetaDto);
  }

  async findOne(facilityUserId: string, projectId: string): Promise<FacilityUser> {
    const facilityUser = await this.facilityUserRepository.findOneByIdWithRelations(
      facilityUserId,
      projectId,
      ["user", "facility", "facilityRole", "project"],
    );
    if (!facilityUser) {
      throw new NotFoundException(`Facility admin with ID #${facilityUser} not found`);
    }
    return facilityUser;
  }

  async remove(facilityUserId: string, projectId: string): Promise<ResponseMessage> {
    const facilityUser = await this.facilityUserRepository.findOneByID(facilityUserId, projectId);
    if (!facilityUser) {
      throw new NotFoundException(`Facility admin with ID #${facilityUserId} not found`);
    }
    await this.facilityUserRepository.deleteById(facilityUserId, projectId);
    return {
      message: `Facility admin with ID #${facilityUserId} has been deleted successfully`,
    };
  }
}
