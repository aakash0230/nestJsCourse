import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, CreateUserProfileParams, UpdateUserParams } from 'src/utils/types';
import { Profile } from 'src/typeorm/entities/Profile';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository : Repository<User>,
        @InjectRepository(Profile) private profileRepository : Repository<Profile>, 
    ){}


    findUsers(){
        console.log("service", 1)
        return this.userRepository.find({relations : ['profile']});
    }

    createUsers(userDetails : CreateUserParams){
        const newUser = this.userRepository.create({
            ...userDetails,
            createdAt : new Date()
        });
        return this.userRepository.save(newUser);
    }

    updateUser(id : number, updateUserDetails : UpdateUserParams) {
        console.log("called update service")
        return this.userRepository.update({id}, {...updateUserDetails});
    }

    deleteUser(id : number){
        return this.userRepository.delete({id})
    }

    async createUserProfile(
        id : number,
        createUserProfileDetails : CreateUserProfileParams,
    )
    {
        const user = await this.userRepository.findOneBy({id});
        if(!user) 
            throw new HttpException(
                'User not found. Cannot create profile',
                HttpStatus.BAD_REQUEST,
            );
        
        const newProfile = this.profileRepository.create(createUserProfileDetails);
        const savedProfile = await this.profileRepository.save(newProfile);
        user.profile = savedProfile
        return this.userRepository.save(user);
         
    }
}
