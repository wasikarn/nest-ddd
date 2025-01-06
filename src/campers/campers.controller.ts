import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateCamperRequest } from './dto/request/create-camper-request.dto';
import { UpdateCamperAllergiesRequest } from './dto/request/update-camper-allergies-request.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCamperCommand } from './commands/create-camper/create-camper.command';
import { UpdateAllergiesCommand } from './commands/update-allergies/update-allergies.command';

@Controller('campers')
export class CampersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get(':id')
  async getCamper(@Param('id') camperId: string): Promise<void> {}

  @Get()
  async getCampers(): Promise<void> {}

  @Post()
  async createCamper(
    @Body() createCamperRequest: CreateCamperRequest,
  ): Promise<void> {
    await this.commandBus.execute<CreateCamperCommand, void>(
      new CreateCamperCommand(createCamperRequest),
    );
  }

  @Patch(':id/allergies')
  async updateCamperAllergies(
    @Param('id') camperId: string,
    @Body() updateCamperAllergiesRequest: UpdateCamperAllergiesRequest,
  ): Promise<void> {
    await this.commandBus.execute<UpdateAllergiesCommand, void>(
      new UpdateAllergiesCommand(
        camperId,
        updateCamperAllergiesRequest.allergies,
      ),
    );
  }
}
