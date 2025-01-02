import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException, Patch } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ResponseSuccess } from "../../domain/model/response/response.success";
import { CreateUserResponse } from "../../domain/model/users/response/user.create.response";
import { User } from "../../infrastructure/entities/user";
import { Repository } from "typeorm";
import { CreateUserRequest } from "../../domain/model/users/request/user.create.request";
import {  InjectMapper} from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { ResponseUtil } from "../../infrastructure/common/response.common";
import { HashUtil } from "../../infrastructure/common/hash.common";
import { PatchUserResponse } from "src/domain/model/users/response/user.patch.response";
import { PatchUserRequest } from "src/domain/model/users/request/user.patch.request";

@Injectable()
export class PatchUserUsecase {
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>,
        @InjectMapper() private readonly mapper: Mapper,
        private responseUtil:ResponseUtil<PatchUserResponse>,
        private hashUtil:HashUtil
    ){}
    
    async execute( patches:PatchUserRequest[],id:number):Promise<ResponseSuccess<PatchUserResponse>>{
        const user = await this.userRepository.findOneByOrFail({id:id});
        if(!user){
            throw new NotFoundException("User not found");
        }
        patches.forEach(patch=>{
            user[patch.field]=patch.value;
        });
        const result = await this.userRepository.save(user).catch(reason=>new InternalServerErrorException(reason));
        const responseData =await this.mapper.mapAsync(result,User,CreateUserResponse);
        return this.responseUtil.toResponse(responseData,HttpStatus.OK);

    }

}