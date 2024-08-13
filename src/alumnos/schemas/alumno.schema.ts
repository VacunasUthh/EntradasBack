import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Definición del documento Mongoose para Alumno
export type AlumnoDocument = Alumno & Document;

@Schema()
export class Domicilio {
  @Prop({ required: true })
  estado: string;

  @Prop({ required: true })
  municipio: string;

  @Prop({ required: true })
  colonia: string;

  @Prop({ required: true })
  calle: string;

  @Prop({ required: true })
  numero_interior: string;

  @Prop({ required: true })
  numero_exterior: string;
}

export const DomicilioSchema = SchemaFactory.createForClass(Domicilio);



@Schema()
export class ContactoEmergencia {
  @Prop({ required: true })
  nombre_c: string;

  @Prop({ required: true })
  apellido_materno_c: string;

  @Prop({ required: true })
  apellido_paterno_c: string;

  @Prop({ required: true })
  telefono_c: string;

  @Prop({ required: true })
  parentesco: string;
}

export const ContactoEmergenciaSchema = SchemaFactory.createForClass(ContactoEmergencia);

@Schema()
export class Alumno {
  @Prop({ required: true , unique: true})
  matricula: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  correo: string;

  @Prop({ required: true })
  telefono: string;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellido_paterno: string;

  @Prop({ required: true })
  apellido_materno: string;

  @Prop({ required: true })
  carrera: string;


  @Prop({ type: DomicilioSchema, required: true })
  domicilio: Domicilio;


  @Prop({ type: ContactoEmergenciaSchema, required: true })
  contacto_emergencia: ContactoEmergencia;

  @Prop({ required: true, unique: true }) 
  deviceUUID: string;
}

export const AlumnoSchema = SchemaFactory.createForClass(Alumno);