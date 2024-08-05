import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './schemas/alumno.schema';

@Controller('alumnos') // Define la ruta base para este controlador
export class AlumnosController {
  // Inyección del servicio de alumnos
  constructor(private readonly alumnosService: AlumnosService) {}

  // Endpoint para agregar un nuevo alumno a la base de datos
  @Post('agregar')
  create(@Body() createAlumnoDto: CreateAlumnoDto): Promise<Alumno> {
    return this.alumnosService.create(createAlumnoDto); 
  }

  // Endpoint para obtener todos los alumnos de la base de datos
  @Get()
  findAll(): Promise<Alumno[]> {
    return this.alumnosService.findAll();
  }

  // Endpoint para obtener un alumno por matrícula
  @Get('mat')
  findOneByMatricula(
    @Query('matricula') matricula: string,

   ): Promise<Alumno> {
    return this.alumnosService.findOneByMatricula(matricula);
  }

  // Endpoint para obtener un alumno por matrícula y contraseña
  @Get('buscar')
  findByMatriculaAndPassword(
    @Query('matricula') matricula: string,
    @Query('password') password: string
  ): Promise<Alumno | null> {
    return this.alumnosService.findByMatriculaAndPassword(matricula, password);
  }

  // Endpoint para actualizar un alumno por ID
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlumnoDto: UpdateAlumnoDto): Promise<Alumno> {
    return this.alumnosService.update(id, updateAlumnoDto); 
  }

  // Endpoint para eliminar un alumno por ID
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Alumno> {
    return this.alumnosService.remove(id); 
  }
}
