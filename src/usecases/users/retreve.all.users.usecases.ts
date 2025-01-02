import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ResponseSuccess } from "../../domain/model/response/response.success";
import { RetreveUserResponse } from "../../domain/model/users/response/user.retreve.response";
import { ResponseUtil } from "../../infrastructure/common/response.common";
import { User } from "src/infrastructure/entities/user";
import { Repository } from "typeorm";
import { UserRetreveAllRequest } from "src/domain/model/users/request/user.retreve.all.request";

@Injectable()
export class RetreveAllUserUsecase {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectMapper() private readonly mapper: Mapper,
        private responseUtil: ResponseUtil<RetreveUserResponse>
    ) { }
    async execute(query: UserRetreveAllRequest): Promise<ResponseSuccess<RetreveUserResponse>> {
        let where = {};
        if (query.email) {
            where["email"] = query.email;
        }
        const users: User[] = await this.userRepository.findBy(where);
        if (users.length == 0) {
            throw new NotFoundException("User Not Found")
        }

        const responseData = users.length > 1 ?
            await this.mapper.mapArrayAsync(users, User, RetreveUserResponse).catch(reason => new InternalServerErrorException(reason)) :
            await this.mapper.mapAsync(users[0], User, RetreveUserResponse);
        return this.responseUtil.toResponse(responseData, HttpStatus.OK);
    }
}