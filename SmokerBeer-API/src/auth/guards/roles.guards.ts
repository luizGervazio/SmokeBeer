import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../config/constants/roles.constants';
import { eRoles } from '../../config/enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Verifica se a rota tem roles requeridas através do decorator @Roles()
    const requiredRoles = this.reflector.getAllAndOverride<eRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    
    //Caso a rota não tenha roles requeridas, permite o acesso.
    if (!requiredRoles || requiredRoles.length === 0) {
      console.log('Nenhuma role requerida para esta rota');
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    // console.log('\n\nUsuário do request:', user);

    // Verifica se o usuário e suas roles estão definidos
    // Se não estiverem, retorna false.
    if (!user || !user.roles) {
      console.log('Usuário ou roles não definidos no request:', user);
      return false;
    }

    // Caso o usuário tenha a role ADMIN, permite acesso sem verificar outras roles (User)
    if (user.roles.includes(eRoles.ADMIN)) {
      // console.log('Usuário é ADMIN, acesso permitido.');
      return true;
    }

    /*
    console.log('Roles do usuário:', user.roles);
    console.log('Roles requeridas para a rota:', requiredRoles);
    */

    const hasRole = user.roles.some((role: eRoles) =>
      requiredRoles.includes(role),
    );
    console.log('Usuário tem role requerida?', hasRole);

    // Se o usuário não tiver a role requerida, lança uma exceção de acesso negado
    if (!hasRole) {
      throw new ForbiddenException('Acesso negado: permissão insuficiente.');
    }

    return hasRole;
  }
}
