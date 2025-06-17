import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { eRoles } from 'src/config/enums/roles.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { mUser } from 'src/entities/user.entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(mUser)
    private userRepository: Repository<mUser>,
  ) {}

  async findOne(document: string): Promise<mUser | null> {
    return this.userRepository.findOne({ where: { document } });
  }

  async findById(id: number): Promise<mUser | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(createUserDto: CreateUserDto) {
    // Verifica se já existe um usuário com o mesmo document
    const existingUser = await this.userRepository.findOne({
      where: { document: createUserDto.document },
    });

    // Se já existir, lança uma exceção de erro
    if (existingUser) {
      throw new BadRequestException('Já existe um usuário com esse documento.');
    }

    const SaltOrRounds = 10;
    const HashedPassword = await bcrypt.hash(
      createUserDto.password,
      SaltOrRounds,
    );

    // Ira separar o createUserDto em um array, e alterar o valor da senha para o valor criptografado
    const user = this.userRepository.create({
      ...createUserDto,
      password: HashedPassword,
    });

    return await this.userRepository.save(user); // ira salvar o usuario no banco de dados
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<mUser> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error(`Usuário com ID ${id} não encontrado`);
    }

    // Se tiver uma nova senha, criptografa
    if (updateUserDto.password) {
      const saltOrRounds = 10;
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        saltOrRounds,
      );
    }

    // Faz o merge dos dados no user atual
    const updatedUser = this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(updatedUser);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
