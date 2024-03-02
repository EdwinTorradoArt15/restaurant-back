import { Module } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { MenuController } from "./menu.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtStrategy } from "src/auth/strategies/jwt.strategy";

@Module({
  providers: [MenuService, JwtStrategy],
  controllers: [MenuController],
  imports: [PrismaModule],
  exports: [MenuService],
})
export class MenuModule {}
