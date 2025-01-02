import {  IsDateString, IsDefined, IsEmail, IsEnum, IsNotEmpty,  IsNumber, IsNumberString, IsString, Length, Matches, Min } from "class-validator";
import { AccessType } from "../../enum/access-type.enum";
import { Expose } from "class-transformer";
import { AutoMap } from "@automapper/classes";

export class CreateUserRequest {
    @AutoMap()
    @IsEmail()
    @IsNotEmpty({message:"email must be provided"})
    @IsDefined({message:"email must be provided"})
    email: string;

    @AutoMap()
    @IsNotEmpty({message:"password must be provided"})
    @IsDefined({message:"password must be provided"})
    @Length(8)
    password: string;

    @AutoMap()
    @IsNotEmpty({message:"country must be provided"})
    @IsDefined({message:"country must be provided"})
    country: string;

    @AutoMap()
    @IsNotEmpty({message:"access type must be provided"})
    @IsEnum(AccessType)
    @IsDefined({message:"access type must be provided"})
    @Expose({ name: "access_type" })
    accessType: AccessType;

    @AutoMap()
    @IsString({message:"full name must be string"})
    @Expose({ name: "full_name" })
    fullName: string | undefined;


    @AutoMap()
    @IsNumberString()
    @Expose({ name: "employer_id" })
    employerId: string | undefined

    @AutoMap()
    @IsDateString()
    @Expose({ name: "birth_date" })
    birthDate: Date | undefined;

    @AutoMap()
    @IsNumber()
    salary: number | undefined

}