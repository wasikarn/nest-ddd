import { Provider } from '@nestjs/common';
import { ListCampersHandler } from './list-campers.handler';
import { GetCamperHandler } from './get-camper.handler';

export const CamperQueryHandlers: Provider[] = [
  ListCampersHandler,
  GetCamperHandler,
];
