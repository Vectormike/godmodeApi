import { Controller, Get, Query } from '@nestjs/common';
import { ApiProduces, ApiTags } from '@nestjs/swagger';
import { ClassificationService } from './classification.service';
import {
  Classification,
  ClassificationQueryParams,
} from './dto/classification-dto';

@Controller('classification')
@ApiTags('Classification')
export class ClassificationController {
  constructor(private classificationService: ClassificationService) {}
  @Get('/classify')
  @ApiProduces('application/json')
  public async Classify(
    @Query() query: ClassificationQueryParams,
  ): Promise<Classification[]> {
    const classification = await this.classificationService.classify(
      query.address,
      query.network,
    );
    return classification;
  }
}
