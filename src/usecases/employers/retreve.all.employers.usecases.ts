import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundError } from "rxjs";
import { EMPLOYER_NOT_FOUND } from "src/domain/message/validation.message";
import { RetreveEmployerResponse } from "src/domain/model/employors/response/employer.retreve.response";
import { ResponseSuccess } from "src/domain/model/response/response.success";
import { ResponseUtil } from "src/infrastructure/common/response.common";
import { Employer } from "src/infrastructure/entities/employer";
import { Repository } from "typeorm";

@Injectable()
export class RetreveAllEmployerUsecase {
    constructor(
       @InjectRepository(Employer)
       private employerRepository:Repository<Employer>,
         @InjectMapper() 
         private readonly mapper: Mapper,
         private responseUtil:ResponseUtil<RetreveEmployerResponse>

    ){}
    async execute(name:string|undefined) : Promise<ResponseSuccess<RetreveEmployerResponse>>{
        console.log(name)
        let where={};
        if(name){
            where["employerName"]=name;
        }
        const employers =await this.employerRepository.findBy(where);
        console.log(employers)
        if(employers.length==0){
            throw new NotFoundException(EMPLOYER_NOT_FOUND);
        }
         const data = employers.length > 1 ?
                    await this.mapper.mapArrayAsync(employers, Employer, RetreveEmployerResponse).catch(reason => new InternalServerErrorException(reason)) :
                    await this.mapper.mapAsync(employers[0], Employer, RetreveEmployerResponse);
        return this.responseUtil.toResponse(data,HttpStatus.OK);
    }
}