import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { UserDto } from "./dto/user.dto";
import { GetUserDto } from "./dto/get-user.dto";
import { RolesService } from "../roles/roles.service";
import { Role } from "../roles/roles.model";
import { RoleDto } from "../roles/dto/role.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User,
              private rolesService: RolesService) {
  }

  async getAllUsers():Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async getUser(value: string):Promise<User> {
    return await this.userRepository.findOne({ where: { login: value }, include: Role });
  }

  async createUser(dto: UserDto):Promise<{}> {
    if (await this.getUser(dto.login)) return;
    const user = await this.userRepository.create(dto);
    for (let i = 0; i < dto.roles.length; i++) {
      await this.addRoleForUser(dto.roles[i], user);
    }
    return { success: true };
  }

  async deleteUser(dto: GetUserDto) {
    return await this.userRepository.destroy({ where: { login: dto.login }});
  }

  async editUser(dto: UserDto):Promise<{}> {
    const user = await this.getUser(dto.login);
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    if (user.name != dto.name) user.name = dto.name;
    if (user.password != dto.password) user.password = dto.password;
    await user.save();
    await this.updateUserRoles(dto, user);
    return { success: true };
  }

  async updateUserRoles(dto: UserDto, user: User) {
    //  add new roles
    for (let i = 0; i < dto.roles.length; i++) {
      let hasRole = false;
      for (let j = 0; j < user.roles.length; j++) {
        if (String(dto.roles[i]) === user.roles[j].name) {
          hasRole = true;
          break;
        }
      }
      if (!hasRole) {
        await this.addRoleForUser(dto.roles[i], user);
      }
    }
    //  remove unused roles
    for (let i = 0; i < user.roles.length; i++) {
      let hasRole = false;
      for (let j = 0; j < dto.roles.length; j++) {
        if (String(dto.roles[j]) === user.roles[i].name) {
          hasRole = true;
          break;
        }
      }
      if (!hasRole) {
        await user.$remove('roles', user.roles[i].id);
      }
    }
  }

  async addRoleForUser(dtoRole, user) {
    let role = await this.rolesService.findRole(String(dtoRole));
    if (!role) {
      role = await this.rolesService.createRole({ ...RoleDto, name: String(dtoRole) });
    }
    await user.$add('roles', role.id);
  }

}
