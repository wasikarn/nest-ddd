import { Injectable } from '@nestjs/common';
import { BaseEntityRepository } from '../../database/abstacts/base-entity.repository';
import { CamperSchema } from './camper.schema';
import { Camper } from '../camper';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CamperSchemaFactory } from './camper-schema.factory';

@Injectable()
export class CamperEntityRepository extends BaseEntityRepository<
  CamperSchema,
  Camper
> {
  constructor(
    @InjectModel(CamperSchema.name)
    camperModel: Model<CamperSchema>,
    camperSchemaFactory: CamperSchemaFactory,
  ) {
    super(camperModel, camperSchemaFactory);
  }
}
