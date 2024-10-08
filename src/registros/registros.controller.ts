import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { RegistrosService } from './registros.service';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { Registro } from './schemas/registro.schema';

@Controller('registros')
export class RegistrosController {
  constructor(private readonly registrosService: RegistrosService) {}

  @Post('agregar') // Ruta personalizada para agregar registros
  create(@Body() createRegistroDto: CreateRegistroDto): Promise<Registro> {
    return this.registrosService.create(createRegistroDto);
  }

  @Get()
  findAll(): Promise<Registro[]> {
    return this.registrosService.findAll();
  }

  @Get('BuscarMat')
  findManyByMatricula(
    @Query('matricula') alumno_matricula: string,): Promise<Registro[]> {
    return this.registrosService.findManyByMatricula(alumno_matricula);
  }

  @Get('buscarRegistros')
  findByMatriculaAndDate(
    @Query('matricula') alumno_matricula: string,
    @Query('fecha') fecha: string
  ): Promise<Registro[]> {
    return this.registrosService.findByMatriculaAndDate(alumno_matricula, fecha);
  }

  @Get('buscarRegistrosPorMes')
  findByMatriculaAndMonth(
    @Query('matricula') alumno_matricula: string,
    @Query('mes') mes: number,
    @Query('anio') anio: number
  ): Promise<Registro[]> {
    return this.registrosService.findByMatriculaAndMonth(alumno_matricula, mes, anio);
  }



  @Put(':id')
  update(@Param('id') id: string, @Body() updateRegistroDto: UpdateRegistroDto): Promise<Registro> {
    return this.registrosService.update(id, updateRegistroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Registro> {
    return this.registrosService.remove(id);
  }
}