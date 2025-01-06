import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CampersQuery } from './campers.query';
import { CamperDtoRepository } from '../db/camper-dto.repository';
import { CamperDto } from '../camper.dto';

@QueryHandler(CampersQuery)
export class CampersHandler implements IQueryHandler<CampersQuery> {
  constructor(private readonly camperDtoRepository: CamperDtoRepository) {}

  async execute(): Promise<CamperDto[]> {
    return this.camperDtoRepository.findAll();
  }
}
