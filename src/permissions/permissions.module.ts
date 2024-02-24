import { Module } from "@nestjs/common";
import { PermissionsService } from "./permissions.service";
import { PermissionsController } from "./permissions.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { MenuModule } from "src/menu/menu.module";

@Module({
  providers: [PermissionsService],
  controllers: [PermissionsController],
  imports: [PrismaModule, MenuModule],
})
export class PermissionsModule {}
