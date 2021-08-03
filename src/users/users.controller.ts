import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UsePipes } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDto } from "./dto/user.dto";
import { GetUserDto } from "./dto/get-user.dto";
import { ValidationPipe } from "../pipes/validation.pipe";

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {
  }

  @Get()
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    if (users.length < 1) throw new HttpException('users not found', HttpStatus.NOT_FOUND);
    return users;
  }

  @Get('/:value')
  async getUser(@Param('value') value: string) {
    const user =await this.userService.getUser(value);
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    return user
  }

  @UsePipes(ValidationPipe)
  @Delete('/delete')
  async deleteUser(@Body() userDto: GetUserDto) {
    const user = await this.userService.deleteUser(userDto);
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    return HttpStatus.OK
  }

  @UsePipes(ValidationPipe)
  @Post('/create')
  async createUser(@Body() userDto: UserDto) {
    const req = await this.userService.createUser(userDto);
    if (!req) throw new HttpException('user already exist', HttpStatus.CONFLICT);
    return req;
  }

  @UsePipes(ValidationPipe)
  @Put('/edit')
  editUser(@Body() userDto: UserDto) {
    return this.userService.editUser(userDto);
  }

}
