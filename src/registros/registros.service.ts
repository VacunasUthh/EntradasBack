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

      //Para ver los registros por matricula de alumno
    async findManyByMatricula(alumno_matricula: string): Promise<Registro[]> {
      return this.registroModel.find({ alumno_matricula }).exec();
    }

    async findByMatriculaAndDate(alumno_matricula: string, fecha: string): Promise<Registro[]> {
      console.log(`Buscando registros para matrícula ${alumno_matricula} y fecha ${fecha}`);

      const startOfDay = new Date(fecha);
      startOfDay.setUTCHours(0, 0, 0, 0);
      
      const endOfDay = new Date(fecha);
      endOfDay.setUTCHours(23, 59, 59, 999);
  
      return this.registroModel.find({
        alumno_matricula,
        fecha: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      }).exec();
    }

    async findByMatriculaAndMonth(alumno_matricula: string, mes: number, anio: number): Promise<Registro[]> {
      console.log(`Buscando registros para matrícula ${alumno_matricula}, mes ${mes} y año ${anio}`);
    
      const startOfMonth = new Date(anio, mes - 1, 1);
      startOfMonth.setUTCHours(0, 0, 0, 0);
    
      const endOfMonth = new Date(anio, mes, 0);
      endOfMonth.setUTCHours(23, 59, 59, 999);
    
      return this.registroModel.find({
        alumno_matricula,
        fecha: {
          $gte: startOfMonth,
          $lte: endOfMonth,
        },
      }).exec();
    }

    //Actualizar por id
  async update(id: string, updateRegistroDto: UpdateRegistroDto): Promise<Registro> {
    return this.registroModel.findByIdAndUpdate(id, updateRegistroDto, { new: true }).exec();
  }
    //Borrar por id
  async remove(id: string): Promise<Registro> {
    return this.registroModel.findByIdAndDelete(id).exec();
  }
}