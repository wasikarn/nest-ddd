import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CamperDocument,
  CamperFlatDocument,
  CamperSchema,
} from './camper.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CamperDto } from '../camper.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class CamperDtoRepository {
  constructor(
    @InjectModel(CamperSchema.name)
    private readonly camperModel: Model<CamperDocument>,
  ) {}

  async findAll(): Promise<CamperDto[]> {
    const campers: CamperFlatDocument[] = await this.camperModel.find().lean();

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

  async findOneById(id: string): Promise<CamperDto> {
    const camper: CamperFlatDocument | null = await this.camperModel
      .findById(new ObjectId(id))
      .lean();

    if (!camper) {
      throw new NotFoundException('Camper was not found.');
    }

    return {
      ...camper,
      isAllergicToPeanuts: camper.allergies
        .map((allergy: string): string => allergy.toLowerCase())
        .includes('peanuts'),
    };
  }
}
