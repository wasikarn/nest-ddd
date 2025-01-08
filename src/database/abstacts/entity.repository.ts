import { AggregateRoot } from '@nestjs/cqrs';
import { IdentifiableEntitySchema } from './identifiable-entity.schema';
import { FilterQuery, Model } from 'mongoose';
import { EntitySchemaFactory } from '../interfaces/entity-schema.factory';
import { NotFoundException } from '@nestjs/common';

export abstract class EntityRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot,
> {
  constructor(
    protected readonly schemaModel: Model<TSchema>,
    protected readonly schemaFactory: EntitySchemaFactory<TSchema, TEntity>,
  ) {}

  async create(entity: TEntity): Promise<void> {
    await new this.schemaModel(this.schemaFactory.create(entity)).save();
  }

  protected async findOne(
    entityFilterQuery: FilterQuery<TSchema>,
  ): Promise<TEntity> {
    const queriedEntity: TSchema | null = await this.schemaModel
      .findOne(entityFilterQuery)
      .lean<TSchema>();

    if (!queriedEntity) {
      throw new NotFoundException('Entity was not found.');
    }

    return this.schemaFactory.createFromSchema(queriedEntity);
  }

  protected async find(
    entityFilterQuery: FilterQuery<TSchema> = {},
  ): Promise<TEntity[]> {
    const queriedEntities: TSchema[] = await this.schemaModel
      .find(entityFilterQuery)
      .lean<TSchema[]>();

    return queriedEntities.map((schema: TSchema): TEntity => {
      return this.schemaFactory.createFromSchema(schema);
    });
  }

  protected async findOneAndReplace(
    entityFilterQuery: FilterQuery<TSchema>,
    entity: TEntity,
  ): Promise<void> {
    const updatedEntityDocument: TSchema | null = await this.schemaModel
      .findOneAndReplace(entityFilterQuery, this.schemaFactory.create(entity), {
        new: true,
        useFindAndModify: false,
        returnDocument: 'after',
      })
      .lean<TSchema>();

    if (!updatedEntityDocument) {
      throw new NotFoundException('Unable to find the entity to replace.');
    }
  }
}
