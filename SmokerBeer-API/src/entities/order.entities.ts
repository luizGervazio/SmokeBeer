import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class mOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column('json')
  items: { wineId: string; quantity: number; price: number }[];

  @Column({ type: 'numeric', precision: 5, scale: 2 })
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED'],
    default: 'CONFIRMED',
  })
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED';

  @Column({ type: 'varchar', nullable: true , default: "PIX"})
  paymentMethod?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
