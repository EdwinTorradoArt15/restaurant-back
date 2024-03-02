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
import { MenuService } from "./menu.service";
import { menu } from "@prisma/client";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";

@Controller("menu")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  //   Obtener todos los menus
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllMenus() {
    return this.menuService.getAllMenus();
  }

  //   Obtener un menu
  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getMenu(@Param("id") id: string) {
    const menu = await this.menuService.getMenu(Number(id));
    if (!menu) {
      throw new NotFoundException(`El menu con el id ${id} no existe`);
    }
    return menu;
  }

  //   Crear un menu
  @Post()
  @UseGuards(JwtAuthGuard)
  async createMenu(@Body() data: menu) {
    if (!data.nombre) {
      throw new BadRequestException("El nombre del menu es requerido");
    }
    if (!data.icono) {
      throw new BadRequestException("El icono del menu es requerido");
    }
    return this.menuService.createMenu(data);
  }

  //   Eliminar un menu
  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async deleteMenu(@Param("id") id: string) {
    const menu = await this.menuService.getMenu(Number(id));
    if (!menu) {
      throw new NotFoundException(`El menu con el id ${id} no existe`);
    }
    await this.menuService.deleteMenu(Number(id));
    return { message: `El menu con el id ${id} ha sido eliminado` };
  }

  //   Actualizar un menu
  @Put(":id")
  @UseGuards(JwtAuthGuard)
  async updateMenu(@Param("id") id: string, @Body() data: menu) {
    const menu = await this.menuService.getMenu(Number(id));
    if (!menu) {
      throw new NotFoundException(`El menu con el id ${id} no existe`);
    }
    if (!data.nombre) {
      throw new BadRequestException("El nombre del menu es requerido");
    }
    if (!data.icono) {
      throw new BadRequestException("El icono del menu es requerido");
    }
    await this.menuService.updateMenu(Number(id), data);
    return { message: `El menu con el id ${id} ha sido actualizado` };
  }
}
