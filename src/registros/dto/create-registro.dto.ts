export class CreateRegistroDto {
  readonly alumno_matricula: string;
  readonly fecha: Date;
  readonly evento: string;
  readonly hora: string;
  readonly ubicacion: {
      latitud: string;
      longitud: string;
  };
}
