import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { user, userData } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Obtener todos los usuarios
  async getAllUsers(): Promise<user[]> {
    return this.prisma.user.findMany({
      include: {
        user_data: true,
      },
    });
  }

  //   Obtener un usuario
  async getUser(id: number): Promise<user> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        user_data: true,
      },
    });
  }

  // Crear un usuario con userData
  async createUser(data: user & { user_data: userData }): Promise<user> {
    const { user_data, ...user } = data;
    return this.prisma.user.create({
      data: {
        ...user,
        user_data: {
          create: user_data,
        },
      },
      include: {
        user_data: true,
      },
    });
  }

  //   Actualizar un usuario
  async updateUser(
    id: number,
    data: user & { user_data: userData }
  ): Promise<user> {
    const { user_data, ...user } = data;
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...user,
        user_data: {
          update: user_data,
        },
      },
      include: {
        user_data: true,
      },
    });
  }

  //   Eliminar un usuario
  async deleteUser(id: number) {
    await this.prisma.userData.deleteMany({
      where: {
        userId: id,
      },
    });

    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
