import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { LoginRequest } from "../domain/model/auth/request/auth.login.request";
import { LoginResponse } from "../domain/model/auth/response/auth.login.response";
import { ResponseSuccess } from "../domain/model/response/response.success";
import { LoginAuthUsecases } from "src/usecases/auth/login.auth.usecases";

@Controller("auth")
export class AuthController {
    constructor(private loginAuthUsecase :LoginAuthUsecases){}

    @Post("/login")
    async login(@Body() request:LoginRequest):Promise<ResponseSuccess<LoginResponse>>{
        return await  this.loginAuthUsecase.execute(request);

    }
}