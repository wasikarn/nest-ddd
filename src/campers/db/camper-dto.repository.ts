import { Injectable } from '@nestjs/common';
import {
  CamperDocument,
  CamperFlatDocument,
  CamperSchema,
} from './camper.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CamperDto } from '../camper.dto';

@Injectable()
export class CamperDtoRepository {
  constructor(
    @InjectModel(CamperSchema.name)
    private readonly camperModel: Model<CamperDocument>,
  ) {}

  async findAll(): Promise<CamperDto[]> {
    const campers: CamperFlatDocument[] = await this.camperModel
      .find({}, {}, { lean: true })
      .exec();

    return campers.map((camper: CamperDocument): CamperDto => {
      const allergiesLower: string[] = camper.allergies.map(
        (allergy: string): string => allergy.toLowerCase(),
      );
      const isAllergicToPeanuts: boolean = allergiesLower.includes('peanuts');

      return {
        ...camper,
        isAllergicToPeanuts,
      };
    });
  }
}
