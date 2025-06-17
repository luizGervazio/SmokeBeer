import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { mWine } from 'src/entities/wine.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mOrder } from 'src/entities/order.entities';

@Module({
  imports: [TypeOrmModule.forFeature([mOrder])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
