import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
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
    async updateUserById(@Param('id', ParseIntPipe) id : number, @Body() updateUserDto : UpdateUserDto,) {
        console.log("called update contoller")
        await  this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUserById(@Param('id', ParseIntPipe) id : number, @Body() updateUserDto : UpdateUserDto,) {
        console.log("called update contoller")
        await  this.userService.deleteUser(id);
    }

    @Post(':id/profiles')
    createUserProfile(
        @Param('id', ParseIntPipe) id : number,
        @Body() createUserProfileDto : CreateUserProfileDto,
    )
    {
        return this.userService.createUserProfile(id, createUserProfileDto); 
    }
}
 