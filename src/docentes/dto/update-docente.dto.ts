import { PartialType } from '@nestjs/mapped-types';
import { CreateDocenteDto } from './create-docente.dto';

// DTO para actualizar un docente, extendiendo el DTO de creación con todos los campos opcionales
export class UpdateDocenteDto extends PartialType(CreateDocenteDto) {}
