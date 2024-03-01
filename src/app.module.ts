import { Module } from '@nestjs/common';
import { MenuModule } from './menu/menu.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MenuModule, PermissionsModule, RoleModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
