import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { mOrder } from 'src/entities/order.entities';
import { Repository } from 'typeorm';
import { mUser } from 'src/entities/user.entities';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(mOrder)
    private orderRepository: Repository<mOrder>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    // Calcular o totalPrice
    createOrderDto.totalPrice = createOrderDto.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );

    // Verificar se totalPrice foi calculado corretamente
    console.log('Total Price:', createOrderDto.totalPrice);

    const order = this.orderRepository.create(createOrderDto);

    return await this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find({});
  }

  findOne(id: number) {
    return this.orderRepository.findOne({
      where: { id },
    });
  }

  remove(id: number) {
    return this.orderRepository.delete(id);
  }

  async countAndSum() {
    return await this.orderRepository
      .createQueryBuilder('orders')
      .select('COUNT(*)', 'count')
      .addSelect('SUM(orders.totalPrice)', 'total')
      .getRawOne(); // { count: '5', total: '1520.00' }
  }
}