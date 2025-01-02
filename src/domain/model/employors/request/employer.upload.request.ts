import { UploadedFile } from "@nestjs/common";
import { Exclude, Expose } from "class-transformer";
import { IsDefined, IsNotEmpty, IsString } from "class-validator";


export class EmployorUploadRequest {

  
    @Exclude()
    file:Express.Multer.File;


    @IsDefined({ message: "employer name must be provided" })
    @IsNotEmpty({ message: "employer name must be provided" })
    @IsString({ message: "employer name must be string" })
    @Expose({name:"employer_name"})
    employerName: string

}