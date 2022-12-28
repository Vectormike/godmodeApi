import { readFileSync } from 'fs';
import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { EtherIntegrationService } from 'src/infrastructure/ether/etherIntegration.service';
import { BigNumber, providers } from 'ethers';
import { Classification } from './dto/classification-dto';

// Read config file
const config = JSON.parse(readFileSync('config.json', 'utf8'));

@Injectable()
export class ClassificationService {
  constructor(
    private readonly etherIntegrationService: EtherIntegrationService,
  ) {
    // Check if config file exist because it is required
    if (!config) {
      throw new InternalServerErrorException('Config file not found');
    }
  }

  async classify(address: string, network: string): Promise<Classification[]> {
    // Check if network exist
    if (!config[network]) {
      throw new BadRequestException('No token found for this network');
    }

    try {
      await this.etherIntegrationService.validateWallet(address, network);

      const classification: Classification[] = [];

      // Loop through tokens and check if address has balance greater than threshold
      for (const token of Object.keys(config[network])) {
        const balance = await this.getBalance(address, network);
        if (balance > config[network][token]) {
          classification.push({
            network: network,
            token: token,
            threshold: config[network][token],
            mode: 'GodMode',
          });
        } else {
          classification.push({
            network: network,
            token: token,
            threshold: config[network][token],
            mode: 'NormalMode',
          });
        }
      }

      return classification;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      });
    }
  }

  private async getBalance(address: string, network: string): Promise<string> {
    const provider = new providers.EtherscanProvider(
      network,
      process.env.ETHERSCAN_API_KEY,
    );

    const gotBalance = await provider.getBalance(address, 'latest');

    const balance = BigNumber.from(gotBalance).toString();
    return balance;
  }
}
