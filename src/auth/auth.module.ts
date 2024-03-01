import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  imports: [
    UserModule,
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: "abc123",
      signOptions: { expiresIn: "1h" },
    }),
  ],
})
export class AuthModule {}
