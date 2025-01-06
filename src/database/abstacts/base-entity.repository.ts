import { IdentifiableEntitySchema } from './identifiable-entity.schema';
import { AggregateRoot } from '@nestjs/cqrs';
import { EntityRepository } from './entity.repository';
import { FilterQuery } from 'mongoose';
import { ObjectId } from 'mongodb';

export abstract class BaseEntityRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot,
> extends EntityRepository<TSchema, TEntity> {
  async findOneById(id: string): Promise<TEntity> {
    return this.findOne({ id: new ObjectId(id) } as FilterQuery<TSchema>);
  }

  async findOneAndReplaceById(id: string, entity: TEntity): Promise<void> {
    return this.findOneAndReplace(
      { id: new ObjectId(id) } as FilterQuery<TSchema>,
      entity,
    );
  }

  async findAll(): Promise<TEntity[]> {
    return this.find({});
  }
}
