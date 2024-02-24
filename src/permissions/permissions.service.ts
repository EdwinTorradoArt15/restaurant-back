import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { permissions } from "@prisma/client";

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  //   Obtener todos los permisos
  async getAllPermissions(): Promise<permissions[]> {
    return this.prisma.permissions.findMany();
  }

  //   Obtener un permiso
  async getPermission(id: number): Promise<permissions> {
    return this.prisma.permissions.findUnique({
      where: {
        id,
      },
    });
  }

  //   Crear un permiso
  async createPermission(data: {
    nombre: string;
    link: string;
    menuId: number;
  }): Promise<permissions> {
    const newData = {
      nombre: data.nombre.toUpperCase(),
      link: data.link,
      menuId: data.menuId,
    };
    return this.prisma.permissions.create({
      data: newData,
    });
  }

  //   Actualizar un permiso
  async updatePermission(
    id: number,
    data: { nombre: string; link: string; menuId: number }
  ): Promise<permissions> {
    const newData = {
      nombre: data.nombre.toUpperCase(),
      link: data.link,
      menuId: data.menuId,
    };
    return this.prisma.permissions.update({
      where: {
        id,
      },
      data: newData,
    });
  }

  //   Eliminar un permiso
  async deletePermission(id: number): Promise<permissions> {
    return this.prisma.permissions.delete({
      where: {
        id,
      },
    });
  }
}
