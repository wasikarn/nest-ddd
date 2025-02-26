import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CamperDto } from '../camper.dto';
import { CamperDtoRepository } from '../db/camper-dto.repository';
import { ListCampersQuery } from './list-campers.query';

@QueryHandler(ListCampersQuery)
export class ListCampersHandler implements IQueryHandler<ListCampersQuery> {
  constructor(private readonly camperDtoRepository: CamperDtoRepository) {}

  async execute(): Promise<CamperDto[]> {
    return this.camperDtoRepository.findAll();
  }
}
