import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { RoleModule } from "src/role/role.module";
import { JwtStrategy } from "src/auth/strategies/jwt.strategy";

@Module({
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
  imports: [PrismaModule, RoleModule],
  exports: [UserService],
})
export class UserModule {}
