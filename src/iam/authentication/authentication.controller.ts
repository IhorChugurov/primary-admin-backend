import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { Auth } from "./decorators/auth.decorator";
import { AuthType } from "./enums/auth-type.enum";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { UserDto } from "src/users/dto/user.dto";
import { UseDto } from "src/common/decorators/dto.decorator";
import { TokensDto } from "./dto/tokens.dto";

@Auth(AuthType.NONE)
@Controller("authentication")
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @UseDto(UserDto)
  @Post("sign-up")
  signUp(@Body() signUpDto: SignUpDto): Promise<UserDto> {
    return this.authService.signUp(signUpDto);
  }

  @UseDto(TokensDto)
  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  signIn(@Body() signInDto: SignInDto): Promise<TokensDto> {
    return this.authService.signIn(signInDto);
  }

  @UseDto(TokensDto)
  @HttpCode(HttpStatus.OK)
  @Post("refresh-tokens")
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokensDto> {
    return this.authService.refreshTokens(refreshTokenDto);
  }
}
