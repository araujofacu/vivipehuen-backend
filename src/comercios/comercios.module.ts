
import { Module } from '@nestjs/common';
import { ComerciosService } from './comercios.service';
import { ComerciosController } from './comercios.controller';
import { OwnerGuard } from './guards/owner/owner.guard';

@Module({
  controllers: [ComerciosController],
  providers: [ComerciosService, OwnerGuard],
})
export class ComerciosModule {}
