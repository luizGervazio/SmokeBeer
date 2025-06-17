import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWineDto } from './dto/create-wine.dto';
import { UpdateWineDto } from './dto/update-wine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mWine } from 'src/entities/wine.entities';

@Injectable()
export class WinesService {
  constructor(
    @InjectRepository(mWine)
    private wineRepository: Repository<mWine>,
  ) {}

  async create(createWineDto: CreateWineDto) {
    const wine = this.wineRepository.create(createWineDto);
    return await this.wineRepository.save(wine);
  }

  findAll() {
    return this.wineRepository.find();
  }

  findOne(id: number) {
    return this.wineRepository.findOneBy({ id });
  }

  async update(id: number, updateWineDto: UpdateWineDto) {
    const wine = await this.wineRepository.findOne({ where: { id } });

    if (!wine) {
      throw new NotFoundException(`Wine with ID ${id} not found`);
    }

    const updatedWine = this.wineRepository.merge(wine, updateWineDto);
    return this.wineRepository.save(updatedWine);
  }

  remove(id: number) {
    return this.wineRepository.delete(id);
  }
}
