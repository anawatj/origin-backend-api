import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DatabaseConfig } from "src/domain/config/database.config.interface";
import { EnveronmentConfig } from "src/domain/config/enveronment.config.interface";
@Injectable()
export class EnveronmentService implements DatabaseConfig,EnveronmentConfig{
    constructor(private configService:ConfigService){}
    getEveronment(): string {
        return this.configService.get<string>("NODE_ENV");
    }
    getDatabaseHost(): string {
        throw new Error("Method not implemented.");
    }
    getDatabasePort(): number {
        throw new Error("Method not implemented.");
    }
    getDatabaseUser(): string {
        throw new Error("Method not implemented.");
    }
    getDatabasePassword(): string {
        throw new Error("Method not implemented.");
    }
    getDatabaseName(): string {
        throw new Error("Method not implemented.");
    }
    
}