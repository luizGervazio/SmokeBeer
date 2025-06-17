import { Module } from '@nestjs/common';
import { WinesService } from './wines.service';
import { WinesController } from './wines.controller';
import { mWine } from 'src/entities/wine.entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([mWine])],
  controllers: [WinesController],
  providers: [WinesService],
})
export class WinesModule {}
