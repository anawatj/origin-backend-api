import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './infrastructure/filters/exception.filter';
import { AuthController } from './api/auth.controller';
import { UserController } from './api/user.controller';
import { EnvironmentModule } from './infrastructure/config/enveronment/enveronment.module';
import { TypeOrmModuleConfig } from './infrastructure/config/typeorm/typeorm.config.module';
import { MapperService } from './infrastructure/mapper/mapper.service';
import { CreateUserUsecases } from './usecases/users/create.users.usecases';
import { ResponseUtil } from './infrastructure/common/response.common';
import { AutomapperModuleConfig } from './infrastructure/config/automapper/automapper.config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/entities/user';
import { RetreveAllUserUsecase } from './usecases/users/retreve.all.users.usecases';
import {JwtModuleConfig} from './infrastructure/config/jwt/jwt.config.module';
import { HashUtil } from './infrastructure/common/hash.common';
import { LoginAuthUsecases } from './usecases/auth/login.auth.usecases';
import { AuthGuard } from './infrastructure/common/auth.common';
import { RetreveByIdUserUsecase } from './usecases/users/retreve.by.id.users.usecases';
import { PatchUserUsecase } from './usecases/users/patch.users.usecases';
import { EmployerController } from './api/employer.controller';
import { MuterModuleConfig } from './infrastructure/config/muter/muter.config.module';
import { UploadEmployerUsecase } from './usecases/employers/upload.employers.usecases';
import { Employer } from './infrastructure/entities/employer';
import { RetreveAllEmployerUsecase } from './usecases/employers/retreve.all.employers.usecases';

@Module({
  imports: [
    EnvironmentModule,
    TypeOrmModuleConfig,
    TypeOrmModule.forFeature([User,Employer]),
    AutomapperModuleConfig,
    JwtModuleConfig,
    MuterModuleConfig
  ],
  controllers: [AuthController,UserController,EmployerController],
  providers: [{
    provide:APP_FILTER,
    useClass:AllExceptionFilter
  }
  ,CreateUserUsecases
  ,RetreveAllUserUsecase
  ,RetreveByIdUserUsecase
  ,PatchUserUsecase
  ,LoginAuthUsecases
  ,UploadEmployerUsecase
  ,RetreveAllEmployerUsecase
  ,MapperService
  ,ResponseUtil
  ,HashUtil
  ,AuthGuard
  ],
})
export class AppModule {}
