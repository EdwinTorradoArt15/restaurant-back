import { Module } from '@nestjs/common';
import { MenuModule } from './menu/menu.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MenuModule, PermissionsModule, RoleModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
