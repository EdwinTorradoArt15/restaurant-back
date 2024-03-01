import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { AuthPayloadDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser({ email, password }: AuthPayloadDto) {
    const findUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!findUser) return null;
    if (findUser.password === password) {
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }
  }
}
