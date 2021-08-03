import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { getModelToken } from "@nestjs/sequelize";
import { Role } from "./roles.model";

describe('RolesService', () => {
  let rolesService: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getModelToken(Role),
          useValue: {
          }
        }
      ],
    }).compile();

    rolesService = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(rolesService).toBeDefined();
  });
});
