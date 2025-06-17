import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WinesService } from './wines.service';
import { CreateWineDto } from './dto/create-wine.dto';
import { UpdateWineDto } from './dto/update-wine.dto';
import { HasRoles } from 'src/config/constants/roles.constants';

@Controller('wines')
export class WinesController {
  constructor(private readonly winesService: WinesService) {}

  @Post()
  @HasRoles('admin')
  create(@Body() createWineDto: CreateWineDto) {
    return this.winesService.create(createWineDto);
  }

  @Get()
  findAll() {
    return this.winesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.winesService.findOne(+id);
  }

  @Patch(':id')
  @HasRoles('admin')
  update(@Param('id') id: string, @Body() updateWineDto: UpdateWineDto) {
    return this.winesService.update(+id, updateWineDto);
  }

  @Delete(':id')
  @HasRoles('admin')
  remove(@Param('id') id: string) {
    return this.winesService.remove(+id);
  }
}
