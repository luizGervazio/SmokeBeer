import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wines')
export class mWine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  productor: string;

  @Column()
  country: string;

  @Column()
  region: string;

  @Column({ type: 'int' })
  year: number; // ano da safra

  @Column({ type: 'numeric', precision: 5, scale: 2 })
  alcoholContent: number; // teor alcoólico em %

  @Column()
  typeGrape: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'numeric', precision: 5, scale: 2 })
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
