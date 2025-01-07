import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { EnveronmentService } from '../enveronment/enveronment.service';
import { EnvironmentModule } from '../enveronment/enveronment.module';

export const getJwtModuleOptions = (config: EnveronmentService): JwtModuleOptions =>
({
  global: true,
  secret: config.getJwtSecret(),
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