import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { ClassificationController } from '../api/classification/classification.controller';

@Module({
  controllers: [ClassificationController],
  imports: [InfrastructureModule],
  exports: [],
})
export class ApiModule {}
