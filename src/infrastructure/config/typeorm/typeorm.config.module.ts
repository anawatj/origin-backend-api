import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnvironmentModule } from "../enveronment/enveronment.module"; 
import { User } from "src/infrastructure/entities/user";
import { Employer } from "src/infrastructure/entities/employer";

@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [User,Employer],
        synchronize: true,
      }),
      EnvironmentModule,
      
    ],
  })
  export class TypeOrmModuleConfig {}