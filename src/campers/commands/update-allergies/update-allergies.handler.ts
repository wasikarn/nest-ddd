import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { Camper } from '../../camper';
import { CamperEntityRepository } from '../../db/camper-entity.repository';
import { UpdateAllergiesCommand } from './update-allergies.command';

@CommandHandler(UpdateAllergiesCommand)
export class UpdateAllergiesHandler
  implements ICommandHandler<UpdateAllergiesCommand>
{
  constructor(
    private readonly camperEntityRepository: CamperEntityRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    allergies,
    camperId,
  }: UpdateAllergiesCommand): Promise<void> {
    const camper: Camper = this.eventPublisher.mergeObjectContext(
      await this.camperEntityRepository.findOneById(camperId),
    );

    camper.updateAllergies(allergies);
    await this.camperEntityRepository.findOneAndReplaceById(camperId, camper);
    camper.commit();
  }
}
