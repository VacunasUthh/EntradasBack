// DTO para definir la estructura de un domicilio al crear un alumno
export class CreateDomicilioDto {
    estado: string;
    municipio: string;
    colonia: string;
    calle: string;
    numero_interior: string;
    numero_exterior: string;
  }
  
  // DTO para definir la estructura de un horario al crear un alumno
  export class CreateHorarioDto {
    entrada: string;
    receso: number;
    salida: string;
  }
  
  // DTO para definir la estructura de un contacto de emergencia al crear un alumno
  export class CreateContactoEmergenciaDto {
    nombre_c: string;
    apellido_materno_c: string;
    apellido_paterno_c: string;
    telefono_c: string;
    parentesco: string;
  }
  
  // DTO para definir la estructura de un alumno al crearlo
  export class CreateAlumnoDto {
    matricula: string;
    password: string;
    correo: string;
    telefono: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    carrera: string;
    fotografia: string;
    domicilio: CreateDomicilioDto;
    docente_matricula: string;
    proyecto_asignado: string;
    horario: CreateHorarioDto;
    contacto_emergencia: CreateContactoEmergenciaDto;
  }
  