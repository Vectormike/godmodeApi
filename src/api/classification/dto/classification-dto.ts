import { ApiProperty } from '@nestjs/swagger';
import { BigNumber } from 'ethers';

export class ClassificationQueryParams {
  @ApiProperty({
    type: String,
    description: 'Address to classify',
  })
  address: string;

  @ApiProperty({
    type: String,
    description: 'Network to classify',
  })
  network: string;
}

export interface Classification {
  network: string;
  token: string;
  threshold: BigNumber | string;
  mode: 'GodMode' | 'NormalMode';
}
