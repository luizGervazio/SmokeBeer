import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { HasRoles } from 'src/config/constants/roles.constants';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HasRoles('user')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @HasRoles('user')
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @HasRoles('user')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Delete(':id')
  @HasRoles('user')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
