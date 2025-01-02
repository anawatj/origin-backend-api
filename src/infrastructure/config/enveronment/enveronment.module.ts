import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnveronmentService } from './enveronment.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [EnveronmentService],
  exports: [EnveronmentService],
})
export class EnvironmentModule {}