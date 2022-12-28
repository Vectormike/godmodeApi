import { BadRequestException, Injectable } from '@nestjs/common';
import { EtherValidationService } from './ether-validate.service';

@Injectable()
export class EtherIntegrationService {
  constructor(
    private readonly etherValidationService: EtherValidationService,
  ) {}

  async validateWallet(wallet: string, network: string): Promise<unknown> {
    // Concurrently validate address and network
    const [isValidAddress, isValidNetwork] = await Promise.all([
      this.etherValidationService.validateAddress(wallet),
      this.etherValidationService.validateNetwork(network),
    ]);

    // Break pipeline for invalid address or network
    if (!isValidAddress || !isValidNetwork) {
      throw new BadRequestException('Invalid address or network');
    }

    return { isValidAddress, isValidNetwork };
  }
}
