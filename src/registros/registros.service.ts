import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { Registro, RegistroDocument } from './schemas/registro.schema';

@Injectable()
export class RegistrosService {
  constructor(@InjectModel(Registro.name) private registroModel: Model<RegistroDocument>) {}

  async create(createRegistroDto: CreateRegistroDto): Promise<Registro> {
    const createdRegistro = new this.registroModel(createRegistroDto);
    return createdRegistro.save();
  }

    //Para ver a todos los registros
  async findAll(): Promise<Registro[]> {
    return this.registroModel.find().exec();
  }
    //Para ver los registros por id
  async findOne(id: string): Promise<Registro> {
    return this.registroModel.findById(id).exec();
  }
//     //Para ver los registros por matricula de alumno
//   async findOneByMatricula(alumno_matricula: string): Promise<Registro> {
//     return this.registroModel.findOne({ alumno_matricula }).exec();
//   }
    //Actualizar por id
  async update(id: string, updateRegistroDto: UpdateRegistroDto): Promise<Registro> {
    return this.registroModel.findByIdAndUpdate(id, updateRegistroDto, { new: true }).exec();
  }
    //Borrar por id
  async remove(id: string): Promise<Registro> {
    return this.registroModel.findByIdAndDelete(id).exec();
  }
}