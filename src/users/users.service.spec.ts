import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from "./users.model";
import { getModelToken } from "@nestjs/sequelize";
import { UserDto } from "./dto/user.dto";
import { RolesService } from "../roles/roles.service";

const dto: UserDto = { name: 'Ivan', login: 'Some', password: 'MyPass1', roles: ['Admin', 'user'] }
const result = { access: true };

describe('UsersService', () => {
  let usersService: UsersService;

  const mockUserRepository = {
    create: jest.fn().mockImplementation(dto => Promise.resolve(User)),
    destroy: jest.fn().mockImplementation(() => 1),
    findOne: jest.fn().mockImplementation(() => User),
  }
  const mockRoleService = {
    findRole: jest.fn().mockImplementation(role => role),
    createRole: jest.fn().mockImplementation(dto => User),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: RolesService,
          useValue: mockRoleService,
        }
      ],
    }).compile();
    usersService = module.get<UsersService>(UsersService);
  });

  it('should get number of delete raws',  async () => {
    expect(await usersService.deleteUser(dto)).toEqual(1);
  });
  //it('should get access true',  async () => {
  //  expect(await usersService.editUser(dto)).toEqual(result);
  //});
  it('should get access true',  async () => {
    expect(await usersService.createUser(dto)).toEqual(undefined);
  });
  it('should be defined',   () => {
    expect(usersService).toBeDefined();
  });
});
