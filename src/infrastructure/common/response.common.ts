import { HttpStatus, InternalServerErrorException } from "@nestjs/common"
import { ResponseSuccess } from "src/domain/model/response/response.success"

export class ResponseUtil<T>{
    toResponse(data:T[]|T|InternalServerErrorException,status:HttpStatus):ResponseSuccess<T>{
        const response = new ResponseSuccess<T>();
        response.data=data;
        response.code=status;
        return response;
    }
}