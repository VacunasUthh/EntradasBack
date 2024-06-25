import { PartialType } from '@nestjs/mapped-types';
import { CreateAlumnoDto } from './create-alumno.dto';

// DTO para actualizar un alumno, extendiendo el DTO de creación con todos los campos opcionales
export class UpdateAlumnoDto extends PartialType(CreateAlumnoDto) {}
