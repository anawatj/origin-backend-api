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
import { EnveronmentService } from "src/infrastructure/config/enveronment/enveronment.service";
import { LOGIN_FAILED, PASSWORD_NOT_MATCH } from "src/domain/message/validation.message";

@Injectable()
export class LoginAuthUsecases {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private enveronmentService: EnveronmentService,
    private responseUtil: ResponseUtil<LoginResponse>,
    private hashUtil: HashUtil,
    private jwtService: JwtService
  ) { }

  async execute(login: LoginRequest): Promise<ResponseSuccess<LoginResponse>> {
    const user = await this.userRepository.findOneBy({ email: login.email });
    if (user) {
      const isMatch = await this.hashUtil.compare(login.password, user.password)
      if (!isMatch) {
        throw new UnauthorizedException(PASSWORD_NOT_MATCH);
      }
      const payload = { sub: user.id, email: user.email };
      const responseData = new LoginResponse();
      responseData.token = await this.jwtService.signAsync(payload, { secret: this.enveronmentService.getJwtSecret() });
      return this.responseUtil.toResponse(responseData, HttpStatus.OK);
    } else {
      throw new UnauthorizedException(LOGIN_FAILED);
    }
  }
}