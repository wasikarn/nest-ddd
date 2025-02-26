import { Provider } from '@nestjs/common';

import { GetCamperHandler } from './get-camper.handler';
import { ListCampersHandler } from './list-campers.handler';

export const CamperQueryHandlers: Provider[] = [
  ListCampersHandler,
  GetCamperHandler,
];
