import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { Camper } from '../../camper';
import { CamperFactory } from '../../camper.factory';
import { CreateCamperCommand } from './create-camper.command';

@CommandHandler(CreateCamperCommand)
export class CreateCamperHandler
  implements ICommandHandler<CreateCamperCommand>
{
  constructor(
    private readonly camperFactory: CamperFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({ createCamperRequest }: CreateCamperCommand): Promise<void> {
    const { age, allergies, name } = createCamperRequest;
    const camper: Camper = this.eventPublisher.mergeObjectContext(
      await this.camperFactory.create(name, age, allergies),
    );

    camper.commit();
  }
}
