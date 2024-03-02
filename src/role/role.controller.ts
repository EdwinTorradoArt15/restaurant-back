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
  UseGuards,
} from "@nestjs/common";
import { RoleService } from "./role.service";
import { role } from "@prisma/client";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";

@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  //   Obtener todos los roles
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllRoles() {
    return this.roleService.getAllRoles();
  }

  //   Obtener un rol
  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getRole(@Param("id") id: string) {
    const role = await this.roleService.getRole(Number(id));
    if (!role) {
      throw new NotFoundException(`El rol con el id ${id} no existe`);
    }
    return role;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createRole(@Body() data: role) {
    if (!data.name) {
      throw new BadRequestException("El nombre del rol es requerido");
    }
    return this.roleService.createRole(data);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  async updateRole(@Param("id") id: string, @Body() data: role) {
    const role = await this.roleService.getRole(Number(id));
    if (!role) {
      throw new NotFoundException(`El rol con el id ${id} no existe`);
    }
    return this.roleService.updateRole(Number(id), data);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async deleteRole(@Param("id") id: string) {
    const role = await this.roleService.getRole(Number(id));
    if (!role) {
      throw new NotFoundException(`El rol con el id ${id} no existe`);
    }
    await this.roleService.deleteRole(Number(id));
    return { message: `El rol con el id ${id} ha sido eliminado` };
  }
}
