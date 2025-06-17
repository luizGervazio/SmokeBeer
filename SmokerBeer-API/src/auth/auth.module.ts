import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from 'src/config/constants/constants';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './guards/roles.guards';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  //Protege a rota de autenticação com o AuthGuard ou seja abilita a rota de autenticação globalmente
  providers: [AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard 
    }
  ],
})
export class AuthModule {}
