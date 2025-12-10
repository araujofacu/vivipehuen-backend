
import { Module } from '@nestjs/common';
import { AlquileresService } from './alquileres.service';
import { AlquileresController } from './alquileres.controller';
import { OwnerGuard } from './guards/owner/owner.guard'; 

@Module({
  controllers: [AlquileresController],
  providers: [AlquileresService, OwnerGuard], 
})
export class AlquileresModule {}
