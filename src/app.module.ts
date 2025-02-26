import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CampersModule } from './campers/campers.module';
import { DatabaseModule } from './database/database.module';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CampersModule,
    DatabaseModule,
  ],
  providers: [],
})
export class AppModule {}
