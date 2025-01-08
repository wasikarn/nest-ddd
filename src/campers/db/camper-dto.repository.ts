import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CamperDocument,
  CamperLeanDocument,
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
    const campers: CamperLeanDocument[] = await this.camperModel
      .find()
      .lean<CamperLeanDocument[]>();

    return campers.map((camper: CamperLeanDocument): CamperDto => {
      const allergiesLower: string[] = this.getAllergiesLower(camper);
      const isAllergicToPeanuts: boolean = allergiesLower.includes('peanuts');

      return { ...camper, isAllergicToPeanuts };
    });
  }

  async findOneById(id: string): Promise<CamperDto> {
    const camper: CamperLeanDocument | null = await this.camperModel
      .findById(new ObjectId(id))
      .lean<CamperLeanDocument>();

    if (!camper) {
      throw new NotFoundException('Camper was not found.');
    }

    return {
      ...camper,
      isAllergicToPeanuts: this.getAllergiesLower(camper).includes('peanuts'),
    };
  }

  private getAllergiesLower(camper: CamperLeanDocument): string[] {
    return camper.allergies.map((allergy: string): string =>
      allergy.toLowerCase(),
    );
  }
}
