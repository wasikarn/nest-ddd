import { IdentifiableEntitySchema } from '../abstacts/identifiable-entity.schema';
import { AggregateRoot } from '@nestjs/cqrs';

export interface EntitySchemaFactory<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot,
> {
  create(entity: TEntity): TSchema;
  createFromSchema(entitySchema: TSchema): TEntity;
}
