import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { eRoles } from 'src/config/enums/roles.enum';

@Entity('users')
export class mUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  document: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  localization: string;

  @Column({ type: 'enum', enum: eRoles, array: true, default: [eRoles.USER] })
  roles: eRoles[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
