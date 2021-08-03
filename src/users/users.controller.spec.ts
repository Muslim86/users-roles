import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from "./users.service";
import { UserDto } from "./dto/user.dto";
import { HttpStatus } from "@nestjs/common";
import { GetUserDto } from "./dto/get-user.dto";

const testUser: UserDto = { name: 'Ivan', login: 'Some', password: 'pasd!lA', roles: ['Admin', 'User'] };
const getUser: GetUserDto = { login: 'Some' }
const result = { access: true };

describe('UsersController', () => {
  let userController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(() => result),
            editUser: jest.fn(() => result),
            deleteUser: jest.fn(() => HttpStatus.OK),
          }
        }
      ]
    }).compile();

    userController = module.get<UsersController>(UsersController);
  });

  it('should get access true', async () => {
    expect(await userController.createUser(testUser)).toEqual(result);
  });
  it('should get access true', async () => {
    expect(await userController.createUser(testUser)).toEqual(result);
  });
  it('should get code 200', async  () => {
    expect(await userController.deleteUser(getUser)).toEqual(HttpStatus.OK)
  });
  it('should be defined',   () => {
    expect(userController).toBeDefined();
  });
});
