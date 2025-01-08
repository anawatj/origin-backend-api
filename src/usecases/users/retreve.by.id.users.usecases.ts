import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ResponseSuccess } from "../../domain/model/response/response.success";
import { RetreveUserResponse } from "../../domain/model/users/response/user.retreve.response";
import { ResponseUtil } from "../../infrastructure/common/response.common";
import { User } from "src/infrastructure/entities/user";
import { Repository } from "typeorm";
import { USER_NOT_FOUND } from "src/domain/message/validation.message";

@Injectable()
export class RetreveByIdUserUsecase{
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>,
        @InjectMapper() private readonly mapper: Mapper,
                private responseUtil:ResponseUtil<RetreveUserResponse>
    ){}
    async execute(id:number):Promise<ResponseSuccess<RetreveUserResponse>>{
        const user = await this.userRepository.findOneByOrFail({id:id}).catch((reason)=>new InternalServerErrorException(reason));
        if(!user){
            throw new NotFoundException(USER_NOT_FOUND);
        }
        const responseData =await this.mapper.mapAsync(user,User,RetreveUserResponse);
        return this.responseUtil.toResponse(responseData,HttpStatus.OK);
    }
}