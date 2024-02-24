import { Module } from '@nestjs/common';
import { MenuModule } from './menu/menu.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [MenuModule, PermissionsModule, RoleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
