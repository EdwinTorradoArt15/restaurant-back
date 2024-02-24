import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { PermissionsService } from "./permissions.service";
import { MenuService } from "src/menu/menu.service";
import { permissions } from "@prisma/client";

@Controller("permissions")
export class PermissionsController {
  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly menuService: MenuService
  ) {}

  @Get()
  async getAllPermissions() {
    return this.permissionsService.getAllPermissions();
  }

  @Get(":id")
  async getPermission(@Param("id") id: string) {
    const permission = await this.permissionsService.getPermission(Number(id));
    if (!permission) {
      throw new NotFoundException(`El permiso con el id ${id} no existe`);
    }
    return permission;
  }

  @Post()
  async createPermission(@Body() data: permissions) {
    const menu = await this.menuService.getMenu(data.menuId);
    if (!menu) {
      throw new NotFoundException(`El menu con el id ${data.menuId} no existe`);
    }
    if (!data.nombre) {
      throw new BadRequestException("El nombre del permiso es requerido");
    }
    if (!data.link) {
      throw new BadRequestException("El link del permiso es requerido");
    }
    if (!data.menuId) {
      throw new BadRequestException("El menuId del permiso es requerido");
    }
    return this.permissionsService.createPermission(data);
  }

  @Put(":id")
  async updatePermission(@Param("id") id: string, @Body() data: permissions) {
    const menu = await this.menuService.getMenu(data.menuId);
    if (!menu) {
      throw new NotFoundException(`El menu no existe`);
    }
    const permission = await this.permissionsService.getPermission(Number(id));
    if (!permission) {
      throw new NotFoundException(`El permiso con el id ${id} no existe`);
    }
    if (!data.nombre) {
      throw new BadRequestException("El nombre del permiso es requerido");
    }
    if (!data.link) {
      throw new BadRequestException("El link del permiso es requerido");
    }
    await this.permissionsService.updatePermission(Number(id), data);
    return { message: `El permiso con el id ${id} ha sido actualizado` };
  }

  @Delete(":id")
  async deletePermission(@Param("id") id: string) {
    const permission = await this.permissionsService.getPermission(Number(id));
    if (!permission) {
      throw new NotFoundException(`El permiso con el id ${id} no existe`);
    }
    await this.permissionsService.deletePermission(Number(id));
    return { message: `El permiso con el id ${id} ha sido eliminado` };
  }
}
