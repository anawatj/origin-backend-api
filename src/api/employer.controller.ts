import { Body, Controller, Get, HttpStatus, ParseFilePipeBuilder, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, NoFilesInterceptor } from "@nestjs/platform-express";
import { EmployorUploadRequest } from "src/domain/model/employors/request/employer.upload.request";
import { RetreveEmployerResponse } from "src/domain/model/employors/response/employer.retreve.response";
import { EmployerUploadResponse } from "src/domain/model/employors/response/employer.upload.response";
import { ResponseSuccess } from "src/domain/model/response/response.success";
import { RetreveAllEmployerUsecase } from "src/usecases/employers/retreve.all.employers.usecases";
import { UploadEmployerUsecase } from "src/usecases/employers/upload.employers.usecases";

@Controller("employers")
export class EmployerController {

    constructor(
        private employerUploadUsecase:UploadEmployerUsecase,
        private employerRetreveAllUsecase:RetreveAllEmployerUsecase
    ){}

    @Get()
    async retreveAll(@Query("name") name:string|undefined):Promise<ResponseSuccess<RetreveEmployerResponse>>{
      const response =await  this.employerRetreveAllUsecase.execute(name);
      return response;
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor("file"))
    async uploadFile(@UploadedFile(
        new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: 'csv',
            })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }),) file: Express.Multer.File,
        @Body() request: EmployorUploadRequest): Promise<ResponseSuccess<EmployerUploadResponse>> {
        request.file=file;
        const response =await this.employerUploadUsecase.execute(request);
        return response;
    }
}