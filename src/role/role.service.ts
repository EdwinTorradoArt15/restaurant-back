import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { role } from "@prisma/client";

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  //   Obtener todos los roles
  async getAllRoles(): Promise<role[]> {
    return this.prisma.role.findMany();
  }

  //   Obtener un rol
  async getRole(id: number): Promise<role> {
    return this.prisma.role.findUnique({
      where: {
        id,
      },
    });
  }

  //   Crear un rol
  async createRole(data: { name: string }): Promise<role> {
    const newData = {
      name: data.name.toUpperCase(),
    };
    return this.prisma.role.create({
      data: newData,
    });
  }

  //   Actualizar un rol
  async updateRole(
    id: number,
    data: {
      name: string;
    }
  ): Promise<role> {
    const newData = {
      name: data.name.toUpperCase(),
    };
    return this.prisma.role.update({
      where: {
        id,
      },
      data: newData,
    });
  }

  //   Eliminar un rol
  async deleteRole(id: number): Promise<role> {
    return this.prisma.role.delete({
      where: {
        id,
      },
    });
  }
}
