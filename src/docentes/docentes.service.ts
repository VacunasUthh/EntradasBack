import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { Docente, DocenteDocument } from './schemas/docente.schema';

@Injectable()
export class DocentesService {
  // Inyección del modelo Docente para interactuar con la base de datos
  constructor(@InjectModel(Docente.name) private docenteModel: Model<DocenteDocument>) {}

  // Método para agregar un nuevo docente a la base de datos
  async create(createDocenteDto: CreateDocenteDto): Promise<Docente> {
    const createdDocente = new this.docenteModel(createDocenteDto);
    return createdDocente.save(); 
  }

  // Método para obtener todos los docentes registrados en la base de datos
  async findAll(): Promise<Docente[]> {
    return this.docenteModel.find().exec(); 
  }

  // Método para encontrar un docente por su matrícula
  async findOne(matricula: string): Promise<Docente> {
    return this.docenteModel.findOne({ matricula }).exec();
  }

  // Método para actualizar un docente por su ID
  async update(id: string, updateDocenteDto: UpdateDocenteDto): Promise<Docente> {
    return this.docenteModel.findByIdAndUpdate(id, updateDocenteDto, { new: true }).exec(); 
  }

  // Método para eliminar un docente por su ID
  async remove(id: string): Promise<Docente> {
    return this.docenteModel.findByIdAndDelete(id).exec();
  }
}
