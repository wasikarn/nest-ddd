import { AggregateRoot } from '@nestjs/cqrs';

import { IdentifiableEntitySchema } from '../abstacts/identifiable-entity.schema';

export interface EntitySchemaFactory<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot,
> {
  create(entity: TEntity): TSchema;
  createFromSchema(entitySchema: TSchema): TEntity;
}
