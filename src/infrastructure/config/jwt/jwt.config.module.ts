import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { EnveronmentConfig } from 'src/domain/config/enveronment.config.interface';
import { EnveronmentService } from '../enveronment/enveronment.service';
import { EnvironmentModule } from '../enveronment/enveronment.module';

export const getJwtModuleOptions = (config: EnveronmentConfig): JwtModuleOptions =>
({
  global: true,
  secret: config.getEveronment(),
  signOptions: { expiresIn: config.getJwtExpirationTime() },
} as JwtModuleOptions);
@Module({
  imports: [
    JwtModule.registerAsync({
      imports:[EnvironmentModule],
      inject:[EnveronmentService],
      useFactory:getJwtModuleOptions
    })
  ],
})
export class JwtModuleConfig {}