import { Provider } from '@nestjs/common';

import { CamperCreatedEvent } from './camper-created.event';

export const CamperEventHandlers: Provider[] = [CamperCreatedEvent];
