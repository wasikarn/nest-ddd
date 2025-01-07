import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CamperDtoRepository } from '../db/camper-dto.repository';
import { CamperDto } from '../camper.dto';
import { FindByIdCamperQuery } from './find-by-id-camper.query';

@QueryHandler(FindByIdCamperQuery)
export class FindByIdCamperHandler
  implements IQueryHandler<FindByIdCamperQuery>
{
  constructor(private readonly camperDtoRepository: CamperDtoRepository) {}

  async execute({ camperId }: FindByIdCamperQuery): Promise<CamperDto> {
    return this.camperDtoRepository.findById(camperId);
  }
}
