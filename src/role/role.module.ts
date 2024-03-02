import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  providers: [RoleService, JwtStrategy],
  controllers: [RoleController],
  imports: [PrismaModule],
  exports: [RoleService]
})
export class RoleModule {}
