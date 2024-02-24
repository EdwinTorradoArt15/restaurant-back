import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { menu } from "@prisma/client";

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  // Obtener todos los menus
  async getAllMenus(): Promise<menu[]> {
    return this.prisma.menu.findMany();
  }

  // Obtener un menu
  async getMenu(id: number): Promise<menu> {
    return this.prisma.menu.findUnique({
      where: {
        id,
      },
    });
  }

  // Crear un menu
  async createMenu(data: { nombre: string; icono: string }): Promise<menu> {
    const newData = {
      nombre: data.nombre.toUpperCase(),
      icono: data.icono,
    };
    return this.prisma.menu.create({
      data: newData,
    });
  }

  // Actualizar un menu
  async updateMenu(
    id: number,
    data: {
      nombre: string;
      icono: string;
    }
  ): Promise<menu> {
    const newData = {
      nombre: data.nombre.toUpperCase(),
      icono: data.icono,
    };
    return this.prisma.menu.update({
      where: {
        id,
      },
      data: newData,
    });
  }

  // Eliminar un menu
  async deleteMenu(id: number): Promise<menu> {
    return this.prisma.menu.delete({
      where: {
        id,
      },
    });
  }
}
