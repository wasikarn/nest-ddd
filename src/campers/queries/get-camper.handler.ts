import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CamperDto } from '../camper.dto';
import { CamperDtoRepository } from '../db/camper-dto.repository';
import { GetCamperQuery } from './get-camper.query';

@QueryHandler(GetCamperQuery)
export class GetCamperHandler implements IQueryHandler<GetCamperQuery> {
  constructor(private readonly camperDtoRepository: CamperDtoRepository) {}

  async execute({ camperId }: GetCamperQuery): Promise<CamperDto> {
    return this.camperDtoRepository.findOneById(camperId);
  }
}
