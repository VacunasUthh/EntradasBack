// DTO para definir la estructura de un horario al crear un docente
export class CreateHorarioDto {
  entrada: string; // Hora de entrada
  receso: number;  // Duración del receso en minutos
  salida: string;  // Hora de salida
}

// DTO para definir la estructura de un alumno al crear un docente
export class CreateAlumnoDto {
  matricula: string; // Matrícula del alumno
  correo: string;    // Correo del alumno
  proyecto: string;  // Proyecto asignado al alumno
  horario: CreateHorarioDto; // Horario del alumno
}

// DTO para definir la estructura de un docente al crearlo
export class CreateDocenteDto {
  matricula: string; // Matrícula del docente
  nombre: string;    // Nombre del docente
  apellido_paterno: string; // Apellido paterno del docente
  apellido_materno: string; // Apellido materno del docente
  carrera: string;   // Carrera del docente
  area: string;      // Área del docente
  correo: string;    // Correo del docente
  alumnos: CreateAlumnoDto[]; // Lista de alumnos asignados al docente
}
