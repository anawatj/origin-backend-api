import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DatabaseConfig } from "src/domain/config/database.config.interface";
import { EnveronmentConfig } from "src/domain/config/enveronment.config.interface";
@Injectable()
export class EnveronmentService implements DatabaseConfig,EnveronmentConfig{
    constructor(private configService:ConfigService){}
    getJwtExpirationTime(): number {
        return this.configService.get<number>("JWT_EXPIRATION_TIME");
    }
    getJwtSecret(): string {
        console.log(this.configService.get<string>("JWT_SECRET"));
        return this.configService.get<string>("JWT_SECRET");
    }
    getEveronment(): string {
        return this.configService.get<string>("NODE_ENV");
    }
    getDatabaseHost(): string {
        return this.configService.get<string>("DATABASE_HOST");
    }
    getDatabasePort(): number {
        return this.configService.get<number>("DATABASE_PORT");
    }
    getDatabaseUser(): string {
        return this.configService.get<string>("DATABASE_USER");
    }
    getDatabasePassword(): string {
        return this.configService.get<string>("DATABASE_PASSWORD")
    }
    getDatabaseName(): string {
        return this.configService.get<string>("DATABASE_NAME")
    }
    
}