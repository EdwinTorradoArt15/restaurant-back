import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { RoleService } from "src/role/role.service";
import { user, userData } from "@prisma/client";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import * as bcrypt from "bcrypt";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService
  ) {}

  //  Obtener todos los usuarios
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  //   Obtener un usuario
  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getUser(@Param("id") id: string) {
    const user = await this.userService.getUser(Number(id));
    if (!user) {
      throw new NotFoundException(`El usuario con id ${id} no existe`);
    }
    return user;
  }

  //   Crear usuario
  @Post()
  @UseGuards(JwtAuthGuard)
  async createUser(@Body() data: user & { user_data: userData }) {
    const role = await this.roleService.getRole(data.roleId);
    if (!role) {
      throw new NotFoundException(`El rol no existe`);
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userDataWithHashedPassword = {
      ...data,
      password: hashedPassword,
    };
    return this.userService.createUser(userDataWithHashedPassword);
  }

  //   Actualizar usuario
  @Put(":id")
  @UseGuards(JwtAuthGuard)
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
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    }
    return this.userService.updateUser(Number(id), data);
  }

  //   Eliminar usuario
  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param("id") id: string) {
    const existingUser = await this.userService.getUser(Number(id));
    if (!existingUser) {
      throw new NotFoundException(`El usuario con id ${id} no existe`);
    }
    await this.userService.deleteUser(Number(id));
    return { message: `Usuario con id ${id} eliminado` };
  }
}
