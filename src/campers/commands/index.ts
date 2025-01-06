import { CreateCamperHandler } from './create-camper/create-camper.handler';
import { Provider } from '@nestjs/common';
import { UpdateAllergiesHandler } from './update-allergies/update-allergies.handler';

export const CamperCommandHandlers: Provider[] = [
  CreateCamperHandler,
  UpdateAllergiesHandler,
];
