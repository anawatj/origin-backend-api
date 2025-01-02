import { HttpStatus, Injectable } from "@nestjs/common";
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

@Injectable()
export class CreateUserUsecases {
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>,
        @InjectMapper() private readonly mapper: Mapper,
        private responseUtil:ResponseUtil<CreateUserResponse>,
        private hashUtil:HashUtil
    ){}
    
    async execute( createUserRequest:CreateUserRequest):Promise<ResponseSuccess<CreateUserResponse>>{
        const user = this.mapper.map(createUserRequest,CreateUserRequest,User);
        user.password = await this.hashUtil.hash(user.password);
        const responseData =await this.mapper.mapAsync(await this.userRepository.save(user),User,CreateUserResponse);
        return this.responseUtil.toResponse(responseData,HttpStatus.CREATED);

    }

}