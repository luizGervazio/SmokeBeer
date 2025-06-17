import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { jwtConstants } from 'src/config/constants/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Verifica se a rota é pública (decorator @Public() ou similar)
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    // Obtém o request do contexto de execução
    const request = context.switchToHttp().getRequest<Request>();
    // Extrai o token do cabeçalho Authorization
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }

    try {
      // Verifica e decodifica o token JWT
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      // console.log('Payload do token JWT:', payload);
    
      // Adiciona o payload ao request para uso posterior
      request['user'] = payload;

    } catch (err) {
      console.error('Erro ao validar token JWT:', err.message);
      throw new UnauthorizedException('Token inválido');
    }

    return true;
  }

  /**
   * Extrai o token JWT do cabeçalho Authorization.
   * @param request O objeto de requisição Express.
   * @returns O token JWT ou undefined se não estiver presente.
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
