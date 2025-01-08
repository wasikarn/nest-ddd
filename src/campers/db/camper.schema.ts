import { IdentifiableEntitySchema } from '../../database/abstacts/identifiable-entity.schema';
import { Prop, Schema } from '@nestjs/mongoose';
import { FlattenMaps, HydratedDocument } from 'mongoose';

export type CamperDocument = HydratedDocument<CamperSchema>;
export type CamperLeanDocument = FlattenMaps<CamperDocument>;

@Schema({ versionKey: false, collection: 'campers' })
export class CamperSchema extends IdentifiableEntitySchema {
  @Prop()
  readonly name: string;

  @Prop()
  readonly age: number;

  @Prop()
  readonly allergies: string[];
}
