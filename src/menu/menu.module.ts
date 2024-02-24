import { Module } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { MenuController } from "./menu.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  providers: [MenuService],
  controllers: [MenuController],
  imports: [PrismaModule],
  exports: [MenuService],
})
export class MenuModule {}