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
import { MenuService } from "./menu.service";
import { menu } from "@prisma/client";

@Controller("menu")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  //   Obtener todos los menus
  @Get()
  async getAllMenus() {
    return this.menuService.getAllMenus();
  }

  //   Crear un menu
  @Post()
  async createMenu(@Body() data: menu) {
    if (!data.nombre) {
      throw new BadRequestException("El nombre del menu es requerido");
    }
    if (!data.icono) {
      throw new BadRequestException("El icono del menu es requerido");
    }
    return this.menuService.createMenu(data);
  }

  //   Obtener un menu
  @Get(":id")
  async getMenu(@Param("id") id: string) {
    const menu = await this.menuService.getMenu(Number(id));
    if (!menu) {
      throw new NotFoundException(`El menu con el id ${id} no existe`);
    }
    return menu;
  }

  //   Eliminar un menu
  @Delete(":id")
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
