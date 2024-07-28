import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ActiveUser } from "src/iam/decorators/active-user.decorator";
import { ActiveUserData } from "src/iam/interfaces/active-user-data.interface";
import { UseDto } from "src/common/decorators/dto.decorator";
import { UserDto } from "./dto/user.dto";

@UseDto(UserDto)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("profile")
  findOne(@ActiveUser() activeUser: ActiveUserData): Promise<UserDto> {
    return this.usersService.findOne(activeUser.sub);
  }
}
