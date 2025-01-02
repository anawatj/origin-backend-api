import { createMap, forMember, ignore, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { User } from "../entities/user";
import { CreateUserResponse } from "src/domain/model/users/response/user.create.response";
import { CreateUserRequest } from "src/domain/model/users/request/user.create.request";
import { RetreveUserResponse } from "src/domain/model/users/response/user.retreve.response";
import { PatchUserResponse } from "src/domain/model/users/response/user.patch.response";
import { Employer } from "../entities/employer";
import { RetreveEmployerResponse } from "src/domain/model/employors/response/employer.retreve.response";

@Injectable()
export class MapperService extends AutomapperProfile{
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }
    get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, User, CreateUserResponse);
            createMap(mapper,CreateUserRequest,User, forMember((t)=>t.id,ignore()));
            createMap(mapper,User,RetreveUserResponse);
            createMap(mapper, User, PatchUserResponse);
            createMap(mapper,Employer,RetreveEmployerResponse);
           
        };
    }
    
}