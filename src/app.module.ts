import { Module } from '@nestjs/common';
import { MenuModule } from './menu/menu.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [MenuModule, PermissionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
