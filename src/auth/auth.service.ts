import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { AuthPayloadDto } from "./dto/auth.dto";
import * as bcrypt from "bcrypt";

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
    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (isPasswordValid) {
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }
  }

  async logSession(
    request: string,
    response: string,
    ip: string,
    email?: string
  ) {
    const userId = email
      ? await this.prisma.user
          .findUnique({ where: { email } })
          .then((user) => user.id)
      : null;
    await this.prisma.logSession.create({
      data: {
        request,
        response: JSON.stringify(response),
        ip,
        user: { connect: { id: userId } },
      },
    });
  }
}
