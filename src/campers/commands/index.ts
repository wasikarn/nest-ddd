import { CreateCamperHandler } from './create-camper.handler';
import { Provider } from '@nestjs/common';

export const CamperCommandHandlers: Provider[] = [CreateCamperHandler];
