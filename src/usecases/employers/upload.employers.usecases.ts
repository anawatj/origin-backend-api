import { HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { readFileSync } from "fs";
import { EmployorUploadRequest } from "src/domain/model/employors/request/employer.upload.request";
import { EmployerUploadResponse } from "src/domain/model/employors/response/employer.upload.response";
import { AccessType } from "src/domain/model/enum/access-type.enum";
import { ResponseSuccess } from "src/domain/model/response/response.success";
import { ResponseUtil } from "src/infrastructure/common/response.common";
import { Employer } from "src/infrastructure/entities/employer";
import { User } from "src/infrastructure/entities/user";
import { In, Not, Repository } from "typeorm";

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
        employee.fileUrl="./files/"+request.file.filename;
        const result = await this.employerRepository.save(employee);
        const csvFile =readFileSync("./files/"+request.file.filename);
        const csvData = csvFile.toString();
        const items = csvData.split("\\");
        items.splice(0,1);
        const users = items.map((item,index)=>{
            const user = new User()
            user.email=item[0];
            user.fullName=item[1];
            user.country=item[2];
            user.birthDate=new Date(item[3]);
            user.salary=parseFloat(item[4]);
            return user;
        });
        const userDbs = await this.userRepository.find({where:{email:In(users.map(user=>user.email))}});
        const userUpdates = userDbs.map(user=>{
            const u = users.find(u=>u.email==user.email);
            user.country=u.country;
            user.salary=u.salary;
            user.accessType=AccessType.employer
            return user;
        });

        await this.userRepository.save(userUpdates).catch((ex)=>new InternalServerErrorException(ex.message));
        const dtcUsers = await this.userRepository.find({where:{email:Not(In(users.map(user=>user.email)))}});
        const dtcUserUpdates = dtcUsers.map(user=>{
            user.accessType=AccessType.dtc
            return user;
        });
        await this.userRepository.save(dtcUserUpdates).catch((ex)=>new InternalServerErrorException(ex.message));
        const responseData = new EmployerUploadResponse();
        responseData.message="Success";
        return this.responseUtil.toResponse(responseData,HttpStatus.OK);
    }
}