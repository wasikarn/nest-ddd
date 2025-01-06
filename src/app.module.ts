import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CampersController } from './campers/campers.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [CampersController],
})
export class AppModule {}
