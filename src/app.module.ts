import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [ApiModule, InfrastructureModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
