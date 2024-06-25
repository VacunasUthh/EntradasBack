import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RegistroDocument = Registro & Document;

@Schema()
export class Registro {
  @Prop({ required: true })
  alumno_matricula: string;

  @Prop({ required: true })
  fecha: Date;

  @Prop({ required: true })
  evento: string;

  @Prop({ required: true })
  hora: string;

  @Prop({ required: true })
  ubicacion: string;
}

export const RegistroSchema = SchemaFactory.createForClass(Registro);
