import { Body, Controller, Get, HttpStatus, ParseFilePipeBuilder, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, NoFilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { EmployorUploadRequest } from "src/domain/model/employors/request/employer.upload.request";
import { RetreveEmployerResponse } from "src/domain/model/employors/response/employer.retreve.response";
import { EmployerUploadResponse } from "src/domain/model/employors/response/employer.upload.response";
import { ResponseSuccess } from "src/domain/model/response/response.success";
import { AuthGuard } from "src/infrastructure/common/auth.common";
import { RetreveAllEmployerUsecase } from "src/usecases/employers/retreve.all.employers.usecases";
import { UploadEmployerUsecase } from "src/usecases/employers/upload.employers.usecases";

@Controller("employers")
export class EmployerController {

    constructor(
        private employerUploadUsecase:UploadEmployerUsecase,
        private employerRetreveAllUsecase:RetreveAllEmployerUsecase
    ){}

    @Get()
    @UseGuards(AuthGuard)
    async retreveAll(@Query("name") name:string|undefined):Promise<ResponseSuccess<RetreveEmployerResponse>>{
      const response =await  this.employerRetreveAllUsecase.execute(name);
      return response;
    }

    @Post('upload')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor("file",{
        storage:diskStorage({
            destination:'./files'
        })
    }))
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