import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "../roles/roles.model";
import { UserRoles } from "./user-roles.model";

interface UserCreationAttributes {
  name: string,
  login: string,
  password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttributes> {

  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @Column({type: DataType.STRING, primaryKey: true, unique: true})
  login: string;

  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @BelongsToMany( () => Role, () => UserRoles)
  roles: Role[];
}