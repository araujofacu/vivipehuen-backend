import { Test, TestingModule } from '@nestjs/testing';
import { AlquileresController } from './alquileres.controller';
import { AlquileresService } from './alquileres.service';

describe('AlquileresController', () => {
  let controller: AlquileresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlquileresController],
      providers: [AlquileresService],
    }).compile();

    controller = module.get<AlquileresController>(AlquileresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});