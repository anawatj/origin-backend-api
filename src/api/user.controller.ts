import { Body, ClassSerializerInterceptor, Controller, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, SerializeOptions, UseGuards, UseInterceptors } from "@nestjs/common";
import { ResponseSuccess } from "../domain/model/response/response.success";
import { CreateUserRequest } from "../domain/model/users/request/user.create.request";
import { CreateUserResponse } from "../domain/model/users/response/user.create.response";
import { AccessType } from "src/domain/model/enum/access-type.enum";
import { CreateUserUsecases } from "src/usecases/users/create.users.usecases";
import { RetreveAllUserUsecase } from "src/usecases/users/retreve.all.users.usecases";
import { RetreveUserResponse } from "src/domain/model/users/response/user.retreve.response";
import { AuthGuard } from "../infrastructure/common/auth.common";
import { RetreveByIdUserUsecase } from "../usecases/users/retreve.by.id.users.usecases";
import { PatchUserRequest } from "../domain/model/users/request/user.patch.request";
import { PatchUserResponse } from "../domain/model/users/response/user.patch.response";
import { PatchUserUsecase } from "../usecases/users/patch.users.usecases";
import { UserRetreveAllRequest } from "src/domain/model/users/request/user.retreve.all.request";

@Controller("users")
export class UserController {
    constructor(
        private createUserUsecase:CreateUserUsecases,
        private retreveAllUserUsecase:RetreveAllUserUsecase,
        private retreveByIdUserUsecase:RetreveByIdUserUsecase,
        private patchUserUsercase:PatchUserUsecase,
    
    ){}
    
    @Post()
    async createUser(@Body() request:CreateUserRequest):Promise<ResponseSuccess<CreateUserResponse>>{
        return await this.createUserUsecase.execute(request);
    }
    @UseGuards(AuthGuard)
    @Get()
    async retreveAllUser(@Query() query:UserRetreveAllRequest):Promise<ResponseSuccess<RetreveUserResponse>>{
        return await this.retreveAllUserUsecase.execute(query);
    }

    @UseGuards(AuthGuard)
    @Get(":id")
    async retreveUserById(@Param('id',new ParseIntPipe()) id:number):Promise<ResponseSuccess<RetreveUserResponse>>{
        return await this.retreveByIdUserUsecase.execute(id);
    }

    @UseGuards(AuthGuard)
    @Patch(":id")
    async patchUser(@Body() request:PatchUserRequest[],@Param("id",new ParseIntPipe()) id:number):Promise<ResponseSuccess<PatchUserResponse>>{
        return await this.patchUserUsercase.execute(request,id);
    }
}