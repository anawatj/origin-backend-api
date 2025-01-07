import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { EnvironmentModule } from "../enveronment/enveronment.module";
import { User } from "src/infrastructure/entities/user";
import { Employer } from "src/infrastructure/entities/employer";
import { EnveronmentService } from "../enveronment/enveronment.service";
export const getTypeOrmModuleOptions = (config: EnveronmentService): TypeOrmModuleOptions =>
({
  type: 'postgres',
  host: config.getDatabaseHost(),
  port: config.getDatabasePort(),
  username: config.getDatabaseUser(),
  password: config.getDatabasePassword(),
  database: config.getDatabaseName(),
  entities: [User, Employer],
  synchronize: true,
} as TypeOrmModuleOptions);
@Module({
  imports: [
    TypeOrmModule.forRootAsync(
      {
        imports: [EnvironmentModule],
        inject: [EnveronmentService],
        useFactory: getTypeOrmModuleOptions

      }
    )

  ],
})
export class TypeOrmModuleConfig { }