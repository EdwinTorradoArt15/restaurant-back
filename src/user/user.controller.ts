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
import { UserService } from "./user.service";
import { RoleService } from "src/role/role.service";
import { user, userData } from "@prisma/client";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService
  ) {}

  //  Obtener todos los usuarios
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  //   Obtener un usuario
  @Get(":id")
  async getUser(@Param("id") id: string) {
    const user = await this.userService.getUser(Number(id));
    if (!user) {
      throw new NotFoundException(`El usuario con id ${id} no existe`);
    }
    return user;
  }

  //   Crear usuario
  @Post()
  async createUser(@Body() data: user & { user_data: userData }) {
    const role = await this.roleService.getRole(data.roleId);
    if (!role) {
      throw new NotFoundException(`El rol no existe`);
    }
    return this.userService.createUser(data);
  }

  //   Actualizar usuario
  @Put(":id")
  async updateUser(
    @Param("id") id: string,
    @Body() data: user & { user_data: userData }
  ) {
    const role = await this.roleService.getRole(data.roleId);
    if (!role) {
      throw new NotFoundException(`El rol no existe`);
    }
    const user = await this.userService.getUser(Number(id));
    if (!user) {
      throw new NotFoundException(`El usuario con id ${id} no existe`);
    }
    return this.userService.updateUser(Number(id), data);
  }

  //   Eliminar usuario
  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    const existingUser = await this.userService.getUser(Number(id));
    if (!existingUser) {
      throw new NotFoundException(`El usuario con id ${id} no existe`);
    }
    await this.userService.deleteUser(Number(id));
    return { message: `Usuario con id ${id} eliminado` };
  }
}
