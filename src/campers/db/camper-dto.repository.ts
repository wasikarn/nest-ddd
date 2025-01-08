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

  /**
   * Retrieves all camper documents from the database and maps them to CamperDto objects.
   *
   * @return {Promise<CamperDto[]>} A promise that resolves to an array of CamperDto objects.
   */
  async findAll(): Promise<CamperDto[]> {
    const camperDocuments: CamperLeanDocument[] = await this.camperModel
      .find()
      .lean<CamperLeanDocument[]>();

    return camperDocuments.map(
      (camper: CamperLeanDocument): CamperDto => this.mapToCamperDto(camper),
    );
  }

  /**
   * Retrieves a single camper by ID.
   *
   * @param {string} id - The ID of the camper.
   * @return {Promise<CamperDto>} A promise that resolves with the CamperDto object corresponding to the provided ID.
   * @throws {NotFoundException} if the camper is not found.
   */
  async findOneById(id: string): Promise<CamperDto> {
    const camperDocument: CamperLeanDocument | null = await this.camperModel
      .findById(new ObjectId(id))
      .lean<CamperLeanDocument>();

    if (!camperDocument) {
      throw new NotFoundException('Camper was not found.');
    }

    return this.mapToCamperDto(camperDocument);
  }

  /**
   * Maps a CamperLeanDocument object to a CamperDto object.
   *
   * @param {CamperLeanDocument} camper - The camper object to be transformed.
   * @return {CamperDto} The transformed CamperDto object.
   */
  private mapToCamperDto(camper: CamperLeanDocument): CamperDto {
    const normalizedAllergies: string[] = this.getNormalizedAllergies(camper);

    return {
      ...camper,
      isAllergicToPeanuts: normalizedAllergies.includes('peanuts'),
    };
  }

  /**
   * Normalizes the list of allergies for a camper by converting each allergy to lowercase.
   *
   * @param camper - The camper object containing the allergies to be normalized.
   * @return An array of normalized allergy strings in lowercase.
   */
  private getNormalizedAllergies(camper: CamperLeanDocument): string[] {
    return camper.allergies.map((allergy: string): string =>
      allergy.toLowerCase(),
    );
  }
}
