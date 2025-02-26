import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { EntitySchemaFactory } from '../../database/interfaces/entity-schema.factory';
import { Camper } from '../camper';
import { CamperSchema } from './camper.schema';

@Injectable()
export class CamperSchemaFactory
  implements EntitySchemaFactory<CamperSchema, Camper>
{
  create(camper: Camper): CamperSchema {
    return {
      _id: new ObjectId(camper.getId()),
      age: camper.getAge(),
      allergies: camper.getAllergies(),
      name: camper.getName(),
    };
  }

  createFromSchema(camperSchema: CamperSchema): Camper {
    return new Camper(
      camperSchema._id.toHexString(),
      camperSchema.name,
      camperSchema.age,
      camperSchema.allergies,
    );
  }
}
