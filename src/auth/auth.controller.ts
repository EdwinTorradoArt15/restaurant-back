import {
  Controller,
  Post,
  Body,
  HttpException,
  UseGuards,
  Request,
  UnauthorizedException,
  Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthPayloadDto } from "./dto/auth.dto";
import { JwtAuthGuard } from "./guards/jwt.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() authPayload: AuthPayloadDto, @Request() req: any) {
    const { body, method, originalUrl } = req;
    const request = `${method} ${originalUrl} - ${JSON.stringify(body)}`;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    try {
      const user = await this.authService.validateUser(authPayload);
      if (!user) {
        const response = {
          response: "Credenciales inválidas",
          status: 401,
          message: "Credenciales inválidas",
          name: "HttpException",
        };
        await this.authService.logSession(
          request,
          JSON.stringify(response),
          ip,
          authPayload.email
        );
        throw new HttpException(response, 401);
      }
      const response = {
        response: "Inicio de sesión exitoso",
        status: 200,
        message: "Inicio de sesión exitoso",
        name: "HttpException",
      };
      await this.authService.logSession(
        request,
        JSON.stringify(response),
        ip,
        authPayload.email
      );
      return user;
    } catch (error) {
      const response = {
        response: "Error al iniciar sesión",
        status: 500,
        message: "Error al iniciar sesión",
        name: "HttpException",
      };
      await this.authService.logSession(
        request,
        JSON.stringify(response),
        ip,
        authPayload.email
      );
      throw new UnauthorizedException(response);
    }
  }

  @Get("register")
  @UseGuards(JwtAuthGuard)
  async test() {
    return "test";
  }
}
