export class Usuario {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  sexo: string;
  documentoIdentidad: string;
  direccion: string;
  telefono: string;
  email: string;
  password: string;
  estado: boolean;
  fechaRegistro: string;
  roles: string[] = [];
}

