import { Controller, Get, Post, Body, Put, Param, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {

    constructor(private userService : UsersService) {}

    @Get()
    async getUsers() {
        return this.userService.findUsers();
    } 

    @Post()
    createUser(@Body() CreateUserDto : CreateUserDto) {
        return this.userService.createUsers(CreateUserDto);
    }

    @Put(':id')
    updateUserById(@Param('id', ParseIntPipe) id : number) {
        this.userService.updateUser()
    }
}
