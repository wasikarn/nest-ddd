import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListCampersQuery } from './list-campers.query';
import { CamperDtoRepository } from '../db/camper-dto.repository';
import { CamperDto } from '../camper.dto';

@QueryHandler(ListCampersQuery)
export class ListCampersHandler implements IQueryHandler<ListCampersQuery> {
  constructor(private readonly camperDtoRepository: CamperDtoRepository) {}

  async execute(): Promise<CamperDto[]> {
    return this.camperDtoRepository.findAll();
  }
}
