import { EntityFactory } from '../database/interfaces/entity.factory';
import { Camper } from './camper';
import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { CamperCreatedEvent } from './events/camper-created.event';
import { CamperEntityRepository } from './db/camper-entity.repository';

@Injectable()
export class CamperFactory implements EntityFactory<Camper> {
  constructor(
    private readonly camperEntityRepository: CamperEntityRepository,
  ) {}

  async create(
    name: string,
    age: number,
    allergies: string[],
  ): Promise<Camper> {
    const camper: Camper = new Camper(
      new ObjectId().toHexString(),
      name,
      age,
      allergies,
    );
    await this.camperEntityRepository.create(camper);
    camper.apply(new CamperCreatedEvent(camper.getId()));

    return camper;
  }
}
