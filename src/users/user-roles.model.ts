import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./users.model";
import { Role } from "../roles/roles.model";

@Table({tableName: 'user_roles'})
export class UserRoles extends Model<UserRoles> {

  @Column({type: DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true})
  id: number;

  @ForeignKey( () => User)
  @Column({type: DataType.STRING})
  userLogin: string;

  @ForeignKey( () => Role)
  @Column({type: DataType.INTEGER})
  roleId: number;
}