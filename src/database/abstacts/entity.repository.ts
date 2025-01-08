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
    const schema: TSchema = this.toSchema(entity);

    await new this.schemaModel(schema).save();
  }

  protected async findOne(
    entityFilterQuery: FilterQuery<TSchema>,
  ): Promise<TEntity> {
    const schema: TSchema | null = await this.schemaModel
      .findOne(entityFilterQuery)
      .lean<TSchema>();

    if (!schema) {
      throw new NotFoundException('Entity was not found.');
    }

    return this.toEntity(schema);
  }

  protected async find(
    entityFilterQuery: FilterQuery<TSchema> = {},
  ): Promise<TEntity[]> {
    const schemas: TSchema[] = await this.schemaModel
      .find(entityFilterQuery)
      .lean<TSchema[]>();

    return schemas.map((schema: TSchema): TEntity => this.toEntity(schema));
  }

  protected async findOneAndReplace(
    entityFilterQuery: FilterQuery<TSchema>,
    entity: TEntity,
  ): Promise<void> {
    const updatedSchema: TSchema | null = await this.schemaModel
      .findOneAndReplace(entityFilterQuery, this.toSchema(entity), {
        new: true,
        useFindAndModify: false,
        returnDocument: 'after',
      })
      .lean<TSchema>();

    if (!updatedSchema) {
      throw new NotFoundException('Unable to find the entity to replace.');
    }
  }

  /**
   * Converts the given schema object into an entity object.
   */
  private toEntity(schema: TSchema): TEntity {
    return this.schemaFactory.createFromSchema(schema);
  }

  /**
   * Converts the given entity to its corresponding schema representation.
   */
  private toSchema(entity: TEntity): TSchema {
    return this.schemaFactory.create(entity);
  }
}
