import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CamperDto } from './camper.dto';
import { CreateCamperCommand } from './commands/create-camper/create-camper.command';
import { UpdateAllergiesCommand } from './commands/update-allergies/update-allergies.command';
import { CreateCamperRequest } from './dto/request/create-camper-request.dto';
import { UpdateCamperAllergiesRequest } from './dto/request/update-camper-allergies-request.dto';
import { GetCamperQuery } from './queries/get-camper.query';
import { ListCampersQuery } from './queries/list-campers.query';

@Controller('campers')
export class CampersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id')
  async getCamper(@Param('id') camperId: string): Promise<CamperDto> {
    return this.queryBus.execute<GetCamperQuery, CamperDto>(
      new GetCamperQuery(camperId),
    );
  }

  @Get()
  async getCampers(): Promise<CamperDto[]> {
    return this.queryBus.execute<ListCampersQuery, CamperDto[]>(
      new ListCampersQuery(),
    );
  }

  @Post()
  async createCamper(
    @Body() createCamperRequest: CreateCamperRequest,
  ): Promise<void> {
    return this.commandBus.execute<CreateCamperCommand, void>(
      new CreateCamperCommand(createCamperRequest),
    );
  }

  @Patch(':id/allergies')
  async updateCamperAllergies(
    @Param('id') camperId: string,
    @Body() updateCamperAllergiesRequest: UpdateCamperAllergiesRequest,
  ): Promise<void> {
    return this.commandBus.execute<UpdateAllergiesCommand, void>(
      new UpdateAllergiesCommand(
        camperId,
        updateCamperAllergiesRequest.allergies,
      ),
    );
  }
}
