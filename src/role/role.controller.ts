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
import { RoleService } from "./role.service";
import { role } from "@prisma/client";

@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  //   Obtener todos los roles
  @Get()
  async getAllRoles() {
    return this.roleService.getAllRoles();
  }

  //   Obtener un rol
  @Get(":id")
  async getRole(@Param("id") id: string) {
    const role = await this.roleService.getRole(Number(id));
    if (!role) {
      throw new NotFoundException(`El rol con el id ${id} no existe`);
    }
    return role;
  }

  @Post()
  async createRole(@Body() data: role) {
    if (!data.name) {
      throw new BadRequestException("El nombre del rol es requerido");
    }
    return this.roleService.createRole(data);
  }

  @Put(":id")
  async updateRole(@Param("id") id: string, @Body() data: role) {
    const role = await this.roleService.getRole(Number(id));
    if (!role) {
      throw new NotFoundException(`El rol con el id ${id} no existe`);
    }
    return this.roleService.updateRole(Number(id), data);
  }

  @Delete(":id")
  async deleteRole(@Param("id") id: string) {
    const role = await this.roleService.getRole(Number(id));
    if (!role) {
      throw new NotFoundException(`El rol con el id ${id} no existe`);
    }
    await this.roleService.deleteRole(Number(id));
    return { message: `El rol con el id ${id} ha sido eliminado` };
  }
}
