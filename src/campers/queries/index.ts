import { Provider } from '@nestjs/common';
import { CampersHandler } from './campers.handler';
import { FindByIdCamperHandler } from './find-by-id-camper.handler';

export const CamperQueryHandlers: Provider[] = [
  CampersHandler,
  FindByIdCamperHandler,
];
