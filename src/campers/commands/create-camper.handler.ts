import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCamperCommand } from './create-camper.command';
import { CamperFactory } from '../camper.factory';

@CommandHandler(CreateCamperCommand)
export class CreateCamperHandler
  implements ICommandHandler<CreateCamperCommand>
{
  constructor(private readonly camperFactory: CamperFactory) {}

  async execute({ createCamperRequest }: CreateCamperCommand): Promise<void> {
    const { name, age, allergies } = createCamperRequest;

    this.camperFactory.create(name, age, allergies);
  }
}
