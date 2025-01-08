import {  IsDateString, IsDefined, IsEmail, IsEnum, IsNotEmpty,  IsNumber, IsNumberString, IsString, Length, Matches, Min } from "class-validator";
import { AccessType } from "../../enum/access-type.enum";
import { Expose } from "class-transformer";
import { AutoMap } from "@automapper/classes";
import { ACCESS_TYPE_REQUIRED, COUNTRY_REQUIRED, EMAIL_REQUIRED, FULL_NAME_MUST_BE_STRING, PASSWORD_REQUIRED } from "src/domain/message/validation.message";

export class CreateUserRequest {
    @AutoMap()
    @IsEmail()
    @IsNotEmpty({message:EMAIL_REQUIRED})
    @IsDefined({message:EMAIL_REQUIRED})
    email: string;

    @AutoMap()
    @IsNotEmpty({message:PASSWORD_REQUIRED})
    @IsDefined({message:PASSWORD_REQUIRED})
    @Length(8)
    password: string;

    @AutoMap()
    @IsNotEmpty({message:COUNTRY_REQUIRED})
    @IsDefined({message:COUNTRY_REQUIRED})
    country: string;

    @AutoMap()
    @IsNotEmpty({message:ACCESS_TYPE_REQUIRED})
    @IsEnum(AccessType)
    @IsDefined({message:ACCESS_TYPE_REQUIRED})
    @Expose({ name: "access_type" })
    accessType: AccessType;

    @AutoMap()
    @IsString({message:FULL_NAME_MUST_BE_STRING})
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