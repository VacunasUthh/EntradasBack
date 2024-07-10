import { Injectable, NotFoundException } from '@nestjs/common';
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

  // Método para encontrar un docente por su matrícula y contraseña
  async findByMatriculaAndPassword(matricula: string, password: string): Promise<Docente | null> {
    return this.docenteModel.findOne({ matricula, password }).exec();
  }
  // Método para encontrar un docente por su matrícula y contraseña
  async findOneByMatricula(matricula: string): Promise<Docente> {
    return this.docenteModel.findOne({ matricula }).exec();
  }

  // Método para actualizar un docente por su matrícula
  async updateByMatricula(matricula: string, updateDocenteDto: UpdateDocenteDto): Promise<Docente> {
    const updatedDocente = await this.docenteModel.findOneAndUpdate(
      { matricula },
      { $set: updateDocenteDto },
      { new: true, useFindAndModify: false },
    ).exec();

    if (!updatedDocente) {
      throw new NotFoundException(`Docente con matrícula ${matricula} no encontrado`);
    }

    return updatedDocente;
  }


 // Método para eañadir alumnos a los docentes por medio de su matrícula
 async addAlumnoByMatricula(matricula: string, alumno: any): Promise<Docente> {
  const updatedDocente = await this.docenteModel.findOneAndUpdate(
    { matricula },
    { $push: { alumnos: alumno } },
    { new: true, useFindAndModify: false },
  ).exec();

  if (!updatedDocente) {
    throw new NotFoundException(`Docente con matrícula ${matricula} no encontrado`);
  }

  return updatedDocente;
}

 // Actualizar el horario de un alumno específico por matrícula
 async updateHorarioByMatricula(matricula: string, alumnoMatricula: string, horario: any): Promise<Docente> {
  const docente = await this.docenteModel.findOne({ matricula }).exec();

  if (!docente) {
    throw new NotFoundException(`Docente con matrícula ${matricula} no encontrado`);
  }

  const alumno = docente.alumnos.find(alumno => alumno.matricula === alumnoMatricula);

  if (!alumno) {
    throw new NotFoundException(`Alumno con matrícula ${alumnoMatricula} no encontrado`);
  }

  // Actualizar el horario del alumno
  alumno.horario = horario;

  // Guardar los cambios
  await docente.save();

  return docente;
}

// Actualizar el horario de multiples alumnos por su matrícula
async updateMultipleHorarios(matricula: string, alumnos: { alumnoMatricula: string, horario: any }[]): Promise<Docente> {
  const docente = await this.docenteModel.findOne({ matricula }).exec();

  if (!docente) {
    throw new NotFoundException(`Docente con matrícula ${matricula} no encontrado`);
  }

  alumnos.forEach(({ alumnoMatricula, horario }) => {
    const alumno = docente.alumnos.find(alumno => alumno.matricula === alumnoMatricula);

    if (alumno) {
      // Actualizar el horario del alumno
      alumno.horario = horario;
    } else {
      throw new NotFoundException(`Alumno con matrícula ${alumnoMatricula} no encontrado`);
    }
  });

  // Guardar los cambios
  await docente.save();

  return docente;
}


  // Método para eliminar un docente por su ID
  async remove(id: string): Promise<Docente> {
    return this.docenteModel.findByIdAndDelete(id).exec();
  }
}
