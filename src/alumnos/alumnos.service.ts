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
  async findOneByMatricula(matricula: string): Promise<Alumno> {
    return this.alumnoModel.findOne({ matricula }).exec();
  }
  // Método para verificar si el diospositivo ya registro a un usuariuo anteriormente
  async checkUUID(deviceUUID: string): Promise<{ exists: boolean }> {
    const alumno = await this.alumnoModel.findOne({ deviceUUID }).exec();
    return { exists: !!alumno };
  }

  // Método para verificar si el diospositivo y el usuario coinciden
  async validateUser(matricula: string, password: string, deviceUUID: string): Promise<boolean> {
    const alumno = await this.alumnoModel.findOne({ matricula, password, deviceUUID }).exec();
    return !!alumno;
  }

  // Método para encontrar un alumno por su matrícula y contraseña
  async findByMatriculaAndPassword(matricula: string, password: string): Promise<Alumno | null> {
    return this.alumnoModel.findOne({ matricula, password }).exec();
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
