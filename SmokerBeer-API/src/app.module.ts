import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './config/constants/roles.constants';
import { RolesGuard } from './auth/guards/roles.guards';
import { WinesModule } from './wines/wines.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'ejdvg1996',
      database: 'WineAPI',
      autoLoadEntities: true,
      synchronize: true, // Cuidado: não use em produção
    }),
    WinesModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
