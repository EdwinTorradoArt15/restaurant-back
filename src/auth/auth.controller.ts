import {
  Controller,
  Post,
  Body,
  HttpException,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthPayloadDto } from "./dto/auth.dto";
import { LocalGuard } from "./guards/local.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  // @UseGuards(LocalGuard)
  async login(@Body() authPayload: AuthPayloadDto) {
    const user = await this.authService.validateUser(authPayload);
    if (!user) throw new HttpException("Credenciales invalidas", 401);
    return user;
  }
}
