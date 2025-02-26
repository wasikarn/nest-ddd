import { Prop, Schema } from '@nestjs/mongoose';
import { FlattenMaps, HydratedDocument } from 'mongoose';

import { IdentifiableEntitySchema } from '../../database/abstacts/identifiable-entity.schema';

export type CamperDocument = HydratedDocument<CamperSchema>;
export type CamperLeanDocument = FlattenMaps<CamperDocument>;

@Schema({ collection: 'campers', versionKey: false })
export class CamperSchema extends IdentifiableEntitySchema {
  @Prop()
  readonly name: string;
  @Prop()
  readonly age: number;
  @Prop()
  readonly allergies: string[];
}
