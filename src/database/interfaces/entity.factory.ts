export interface EntityFactory<TEntity> {
  create(...args: never): Promise<TEntity> | TEntity;
}
