import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { Docente } from './schemas/docente.schema';

@Controller('docentes') // la ruta base para este controlador
export class DocentesController {
  // Inyección del servicio de docentes
  constructor(private readonly docentesService: DocentesService) {}

  // Endpoint para crear un nuevo docente
  @Post()
  create(@Body() createDocenteDto: CreateDocenteDto): Promise<Docente> {
    return this.docentesService.create(createDocenteDto); // Llama al método create del servicio
  }

  // Endpoint para obtener todos los docentes
  @Get()
  findAll(): Promise<Docente[]> {
    return this.docentesService.findAll();
  }

  // Endpoint para obtener un docente por matrícula
  @Get(':matricula')
  findOne(@Param('matricula') matricula: string): Promise<Docente> {
    return this.docentesService.findOne(matricula); 
  }

  // Endpoint para actualizar un docente por ID
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDocenteDto: UpdateDocenteDto): Promise<Docente> {
    return this.docentesService.update(id, updateDocenteDto);
  }

  // Endpoint para eliminar un docente por ID
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Docente> {
    return this.docentesService.remove(id); 
  }
}
