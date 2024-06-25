import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno, AlumnoDocument } from './schemas/alumno.schema';

@Injectable()
export class AlumnosService {
  // Inyección del modelo Alumno para interactuar con la base de datos
  constructor(@InjectModel(Alumno.name) private alumnoModel: Model<AlumnoDocument>) {}

  // Método para crear un nuevo alumno
  async create(createAlumnoDto: CreateAlumnoDto): Promise<Alumno> {
    const createdAlumno = new this.alumnoModel(createAlumnoDto);
    return createdAlumno.save(); // Guarda el nuevo alumno en la base de datos
  }

  // Método para obtener todos los alumnos
  async findAll(): Promise<Alumno[]> {
    return this.alumnoModel.find().exec(); // Retorna todos los documentos de la colección Alumno
  }

  // Método para encontrar un alumno por su matrícula
  async findOne(matricula: string): Promise<Alumno> {
    return this.alumnoModel.findOne({ matricula }).exec(); // Busca un alumno por el campo matrícula
  }

  // Método para actualizar un alumno por su ID
  async update(id: string, updateAlumnoDto: UpdateAlumnoDto): Promise<Alumno> {
    return this.alumnoModel.findByIdAndUpdate(id, updateAlumnoDto, { new: true }).exec(); // Actualiza y retorna el alumno actualizado
  }

  // Método para eliminar un alumno por su ID
  async remove(id: string): Promise<Alumno> {
    return this.alumnoModel.findByIdAndDelete(id).exec(); // Elimina y retorna el alumno eliminado
  }
}
