import { CamperCreatedEvent } from './camper-created.event';
import { Provider } from '@nestjs/common';

export const CamperEventHandlers: Provider[] = [CamperCreatedEvent];
