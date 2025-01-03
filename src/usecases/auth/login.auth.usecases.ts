import { HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../infrastructure/entities/user";
import { Repository } from "typeorm";
import { LoginRequest } from "../../domain/model/auth/request/auth.login.request";
import { LoginResponse } from "../../domain/model/auth/response/auth.login.response";
import { ResponseSuccess } from "../../domain/model/response/response.success";
import { HashUtil } from "../../infrastructure/common/hash.common";
import { JwtService } from '@nestjs/jwt';
import { ResponseUtil } from "src/infrastructure/common/response.common";

@Injectable()
export class LoginAuthUsecases {
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>,
        private responseUtil:ResponseUtil<LoginResponse>,
        private hashUtil:HashUtil,
        private jwtService: JwtService
    ){}

    async execute(login :LoginRequest) : Promise<ResponseSuccess<LoginResponse>>{
       const user = await this.userRepository.findOneBy({email:login.email});
       if(user){
            const isMatch = await this.hashUtil.compare(login.password,user.password)
            if(!isMatch){
                    throw new UnauthorizedException("Password Not match");
            }
            const payload = { sub: user.id, email: user.email };
            const responseData = new LoginResponse();
            responseData.token=await this.jwtService.signAsync(payload);
            return this.responseUtil.toResponse(responseData,HttpStatus.OK);
       }else{
         throw new UnauthorizedException("Login Failed");
       }
    }
}