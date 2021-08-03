import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./roles.model";
import { RoleDto } from "./dto/role.dto";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {
  }

  async createRole(dto: RoleDto):Promise<Role> {
    return await this.roleRepository.create(dto);
  }

  async findRole(value: string):Promise<Role> {
    return await this.roleRepository.findOne({ where: { name: value } });
  }
}
