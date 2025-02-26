import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CamperCreatedEvent } from './camper-created.event';

@EventsHandler(CamperCreatedEvent)
export class CamperCreatedHandler implements IEventHandler<CamperCreatedEvent> {
  handle({ camperId }: CamperCreatedEvent): void {
    console.log(`Camper ${camperId} created event handled`);
  }
}
