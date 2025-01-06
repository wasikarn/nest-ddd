import { Provider } from '@nestjs/common';
import { CampersHandler } from './campers.handler';

export const CamperQueryHandlers: Provider[] = [CampersHandler];
