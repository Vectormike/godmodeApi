import { isAddress } from 'ethers/lib/utils';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class EtherValidationService {
  async validateAddress(address: string): Promise<boolean> {
    const isValid = isAddress(address);

    if (!isValid) {
      throw new BadRequestException('Invalid Wallet Address');
    }

    return isValid;
  }

  async validateNetwork(network: string): Promise<boolean> {
    const isValid =
      network === 'mainnet' ||
      network === 'ropsten' ||
      network === 'Binance Smart Chain';

    if (!isValid) {
      throw new BadRequestException('Invalid Network');
    }

    return isValid;
  }
}
