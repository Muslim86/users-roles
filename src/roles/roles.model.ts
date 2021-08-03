import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { UserRoles } from "../users/user-roles.model";

interface RoleCreationAttributes {
  name: string,
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttributes> {

  @Column({type: DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true})
  id: number;

  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @BelongsToMany( () => User, () => UserRoles)
  user: User[];
}