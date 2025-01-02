import { HttpStatus, InternalServerErrorException } from "@nestjs/common";

export class ResponseSuccess<T>{
    data:T[] | T | InternalServerErrorException;
    code:HttpStatus;
}