import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EmployorUploadRequest } from "src/domain/model/employors/request/employer.upload.request";
import { EmployerUploadResponse } from "src/domain/model/employors/response/employer.upload.response";
import { ResponseSuccess } from "src/domain/model/response/response.success";
import { ResponseUtil } from "src/infrastructure/common/response.common";
import { Employer } from "src/infrastructure/entities/employer";
import { User } from "src/infrastructure/entities/user";
import { Repository } from "typeorm";

@Injectable()
export class UploadEmployerUsecase{
    constructor(
        @InjectRepository(Employer)
        private employerRepository:Repository<Employer>,
        @InjectRepository(User)
        private userRepository:Repository<User>,
        private responseUtil:ResponseUtil<EmployerUploadResponse>
    ){}
    async execute(request:EmployorUploadRequest):Promise<ResponseSuccess<EmployerUploadResponse>>{
        const employee = new Employer();
        employee.employerName=request.employerName;
        employee.fileUrl=request.file.originalname;
        const result = await this.employerRepository.save(employee);
        const responseData = new EmployerUploadResponse();
        responseData.message="Success";
        return this.responseUtil.toResponse(responseData,HttpStatus.OK);
    }
}