import { HttpModule, Module } from '@nestjs/common';
import { EtherValidationService } from './ether/ether-validate.service';
import { EtherIntegrationService } from './ether/etherIntegration.service';
import { ClassificationService } from 'src/api/classification/classification.service';

@Module({
  imports: [HttpModule],
  providers: [
    EtherIntegrationService,
    EtherValidationService,
    ClassificationService,
  ],
  exports: [
    EtherIntegrationService,
    EtherValidationService,
    ClassificationService,
  ],
})
export class InfrastructureModule {}
