import { EntityFactory } from '../database/interfaces/entity.factory';
import { Camper } from './camper';
import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class CamperFactory implements EntityFactory<Camper> {
  create(name: string, age: number, allergies: string[]): Camper {
    return new Camper(new ObjectId().toHexString(), name, age, allergies);
  }
}
