import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';
export class LoginRequest {
    @IsEmail()
    @IsNotEmpty({message:"email must be provided"})
    @IsDefined({message:"email must be provided"})
    email : string ;

    @IsNotEmpty({message:"password must be provided"})
    @IsDefined({message:"password must be provided"})
    password:string
}