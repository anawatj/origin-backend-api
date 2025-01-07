export interface EnveronmentConfig {
    getEveronment():string;
    getJwtSecret():string;
    getJwtExpirationTime():number;
}