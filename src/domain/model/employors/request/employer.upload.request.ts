import { UploadedFile } from "@nestjs/common";
import { Exclude, Expose } from "class-transformer";
import { IsDefined, IsNotEmpty, IsString } from "class-validator";
import { EMPLOYER_NAME_MUST_BE_STRING, EMPLOYER_NAME_REQUIRED } from "src/domain/message/validation.message";


export class EmployorUploadRequest {

  
    @Exclude()
    file:Express.Multer.File;


    @IsDefined({ message: EMPLOYER_NAME_REQUIRED })
    @IsNotEmpty({ message: EMPLOYER_NAME_REQUIRED })
    @IsString({ message: EMPLOYER_NAME_MUST_BE_STRING })
    @Expose({name:"employer_name"})
    employerName: string

}