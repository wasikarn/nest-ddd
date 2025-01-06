import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CampersController } from './campers/campers.controller';
import { CampersModule } from './campers/campers.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CampersModule,
    DatabaseModule,
  ],
  controllers: [CampersController],
  providers: [],
})
export class AppModule {}
