import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    document: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(document);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    // Verifica se a senha fornecida corresponde à senha armazenada no banco de dados
    // Usa bcrypt para comparar a senha fornecida com a senha criptografada do usuário
    const passwordValid = await bcrypt.compare(pass, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Senha incorreta');
    }

    // Cria o payload do token JWT com os dados do usuário
    // Inclui o ID, nome, documento e roles do usuário
    const payload = {
      sub: user.id,
      name: user.name,
      document: user.document,
      roles: user.roles,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
