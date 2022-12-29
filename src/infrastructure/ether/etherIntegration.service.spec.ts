import { Test, TestingModule } from '@nestjs/testing';
import { EtherIntegrationService } from '../ether/etherIntegration.service';
import { EtherValidationService } from '../ether/ether-validate.service';

describe('EtherIntegrationService', () => {
  let integrationService: EtherIntegrationService;
  let validationService: EtherValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EtherIntegrationService,
        {
          provide: EtherValidationService,
          useValue: {
            validateAddress: jest.fn(),
            validateNetwork: jest.fn(),
          },
        },
      ],
    }).compile();

    integrationService = module.get<EtherIntegrationService>(
      EtherIntegrationService,
    );
    validationService = module.get<EtherValidationService>(
      EtherValidationService,
    );
  });

  describe('Wallet Address Validation', () => {
    it('should validate the address and network concurrently and return the result', async () => {
      (validationService.validateAddress as jest.Mock).mockResolvedValue(true);
      (validationService.validateNetwork as jest.Mock).mockResolvedValue(true);

      const result = await integrationService.validateWallet(
        '0x0000000000000000000000000000000000000000',
        'mainnet',
      );
      expect(result).toEqual({ isValidAddress: true, isValidNetwork: true });
      expect(validationService.validateAddress).toHaveBeenCalledWith(
        '0x0000000000000000000000000000000000000000',
      );
      expect(validationService.validateNetwork).toHaveBeenCalledWith('mainnet');
    });

    it('should throw an error if the address is invalid', async () => {
      (validationService.validateAddress as jest.Mock).mockResolvedValue(false);
      (validationService.validateNetwork as jest.Mock).mockResolvedValue(true);

      await expect(
        integrationService.validateWallet('invalid-address', 'mainnet'),
      ).rejects.toThrowError('Invalid address or network');
    });

    it('should throw an error if the network is invalid', async () => {
      (validationService.validateAddress as jest.Mock).mockResolvedValue(true);
      (validationService.validateNetwork as jest.Mock).mockResolvedValue(false);

      await expect(
        integrationService.validateWallet(
          '0x0000000000000000000000000000000000000000',
          'invalid-network',
        ),
      ).rejects.toThrowError('Invalid address or network');
    });
    it('should throw an error if the address and network are invalid', async () => {
      (validationService.validateAddress as jest.Mock).mockResolvedValue(false);
      (validationService.validateNetwork as jest.Mock).mockResolvedValue(false);

      await expect(
        integrationService.validateWallet('invalid-address', 'invalid-network'),
      ).rejects.toThrowError('Invalid address or network');
    });
  });
});
