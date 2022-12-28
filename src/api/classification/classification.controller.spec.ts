import { ClassificationController } from './classification.controller';
import { ClassificationService } from './classification.service';
import { EtherIntegrationService } from '../../infrastructure/ether/etherIntegration.service';
import { Classification } from './dto/classification-dto';

describe('ClassificationController', () => {
  let classificationController: ClassificationController;
  let classificationService: ClassificationService;
  let etherIntegrationService: EtherIntegrationService;

  beforeEach(() => {
    classificationService = new ClassificationService(etherIntegrationService);
    classificationController = new ClassificationController(
      classificationService,
    );
  });

  describe('Classify', () => {
    it('should return a list of classifications for the given address and network', async () => {
      const query = { address: '0xabc', network: 'mainnet' };
      const classification: Classification[] = [
        {
          network: 'mainnet',
          token: '0xabc',
          threshold: '0',
          mode: 'GodMode',
        },
      ];

      jest
        .spyOn(classificationService, 'classify')
        .mockResolvedValue(classification);

      expect(await classificationController.Classify(query)).toBe(
        classification,
      );
    });

    it('should throw an error if the address is invalid', async () => {
      const query = { address: 'invalid', network: 'mainnet' };

      jest
        .spyOn(classificationService, 'classify')
        .mockRejectedValue(new Error('Invalid address or network'));

      await expect(
        classificationController.Classify(query),
      ).rejects.toThrowError('Invalid address or network');
    });
  });
});
