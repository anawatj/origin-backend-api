import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';
import { EMAIL_REQUIRED, PASSWORD_REQUIRED } from 'src/domain/message/validation.message';
export class LoginRequest {
    @IsEmail()
    @IsNotEmpty({message:EMAIL_REQUIRED})
    @IsDefined({message:EMAIL_REQUIRED})
    email : string ;

    @IsNotEmpty({message:PASSWORD_REQUIRED})
    @IsDefined({message:PASSWORD_REQUIRED})
    password:string
}