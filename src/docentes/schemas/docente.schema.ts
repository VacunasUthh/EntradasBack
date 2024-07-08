import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DocenteDocument = Docente & Document;

@Schema()
export class Horario {
  @Prop({ required: true })
  entrada: string;

  @Prop({ required: true })
  receso: number;

  @Prop({ required: true })
  salida: string;
}

export const HorarioSchema = SchemaFactory.createForClass(Horario);

@Schema()
export class Alumno {
  @Prop({ required: true })
  matricula: string;

  @Prop({ required: true })
  correo: string;

  @Prop({ required: true })
  proyecto: string;

  @Prop({ type: HorarioSchema, required: true })
  horario: Horario;
}

export const DocentesSchema = SchemaFactory.createForClass(Alumno);

@Schema()
export class Docente {
  @Prop({ required: true, unique: true })
  matricula: string;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellido_paterno: string;

  @Prop({ required: true })
  apellido_materno: string;

  @Prop({ required: true })
  carrera: string;

  @Prop({ required: true })
  area: string;

  @Prop({ required: true })
  correo: string;

  @Prop({ type: [DocentesSchema], required: true })
  alumnos: Alumno[];
}

export const DocenteSchema = SchemaFactory.createForClass(Docente);
